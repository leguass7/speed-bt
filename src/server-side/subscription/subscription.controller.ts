import type { Subscription } from '@prisma/client'
import { add } from 'date-fns'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { RequestHandler } from 'next-connect'
import { ApiError } from 'next/dist/server/api-utils'

import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'
import { expiracao } from '~/server-side/config'

import { createApiPix } from '../api-pix.service'
import type { IAppConfigService } from '../app-config/app-config.service'
import type { ICategoryService } from '../category/category.service'
import type { IPaymentService } from '../payment/payment.service'
import type { IUserService } from '../users'
import {
  IRequestStoreSubscription,
  CreateSubscription,
  requestToSubscriptionDto,
  UpdateSubscription,
  IResponseSubscriptionStore,
  ResultSubscription
} from './subscription.dto'
import type { ISubscriptionService } from './subscription.service'

type Reduce = [IRequestStoreSubscription[], IRequestStoreSubscription[]]
type ReduceResult = [ResultSubscription[], ResultSubscription[]]
type ResultSubscriptionMerged = Omit<ResultSubscription, 'id' | 'paymentId' | 'createdBy' | 'updatedBy'> & {
  merged?: boolean
}

function store(
  subService: ISubscriptionService,
  categoryService: ICategoryService,
  userService: IUserService,
  paymentService: IPaymentService,
  appConfigService: IAppConfigService
) {
  return async (req: AuthorizedApiRequest<{ data: IRequestStoreSubscription[] }>, res: NextApiResponse<IResponseSubscriptionStore>) => {
    const { body, auth } = req
    const { data } = body

    const categories = await categoryService.list()

    const [toCreate, toUpdate] = data.reduce(
      ([c, u], item, index) => {
        const discount = !!(index >= 1)
        const found = categories.find(f => f.id === item.categoryId)
        const itemData: typeof item = { ...item, value: discount ? 50 : found.price }
        if (item?.id) u.push(itemData)
        else c.push(itemData)
        return [c, u]
      },
      [[], []] as Reduce
    )

    const created = await Promise.all(
      toCreate.map(async d => {
        const saveData = { ...requestToSubscriptionDto<CreateSubscription>(d, auth.userId), createdBy: auth.userId }
        const result = await subService.create(saveData)
        return result
      })
    )

    const updated = await Promise.all(
      toUpdate.map(async d => {
        const { id, ...saveData }: UpdateSubscription = { ...requestToSubscriptionDto<UpdateSubscription>(d), updatedBy: auth.userId }
        const result = await subService.update(id, saveData)
        return result
      })
    )

    const subscriptions = await subService.find({
      where: { id: { in: [...created, ...updated] } },
      select: { id: true, paid: true, paymentId: true, value: true, categoryId: true }
    })

    // deleta pagamentos antigos n??o realizados
    const filterPay = (f: Subscription) => !!(!f?.paid && !!f?.paymentId)
    await Promise.all(subscriptions.filter(filterPay).map(async sub => paymentService.remove(sub.paymentId)))

    const toCreatePayment = subscriptions.filter(f => !f?.paid)
    const value = toCreatePayment.reduce((acc, { value }) => (acc += value), 0)

    // cria pagamento

    const overdue = add(new Date(), { minutes: expiracao })
    const paymentId = await paymentService.create({
      actived: true,
      method: 'PIX',
      paid: false,
      value,
      createdBy: auth.userId,
      userId: auth.userId,
      overdue
    })

    // salva Id do pagamento
    await Promise.all(toCreatePayment.map(sub => subService.update(sub.id, { paymentId })))

    // adquiri usu??rio
    const user = await userService.findOneToPayment(auth.userId)
    if (!user) throw new ApiError(403, 'Usu??rio n??o identificado')
    if (!user?.cpf) throw new ApiError(403, 'CPF n??o informado')

    // gera pix
    const apiPix = await createApiPix(appConfigService)
    const cob = await paymentService.generate(apiPix, { user, value, paymentId })
    // console.log('cob', cob)
    if (!cob || !cob?.success) {
      // console.log('cob', cob)
      throw new ApiError(403, 'Erro ao gerar PIX')
    }

    return res.status(200).json({ success: true, imageQrcode: cob?.imagemQrcode, qrcode: cob?.qrcode, paymentId, txid: cob?.txid })
  }
}

function remove(subService: ISubscriptionService): RequestHandler<NextApiRequest, NextApiResponse> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth, query } = req
    const id = +query?.id

    const subscription = await subService.findOne({ actived: true, userId: auth.userId, id })
    if (!subscription) throw new ApiError(403, 'Inscri????o n??o localizada')
    if (!!subscription?.paid) throw new ApiError(403, 'Inscri????o paga n??o pode ser excu??da')

    const success = await subService.remove(id, true)

    return res.status(200).json({ success })
  }
}

function list(subService: ISubscriptionService): RequestHandler<NextApiRequest, NextApiResponse> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth } = req

    const subscriptions = await subService.list({ actived: true, OR: [{ userId: auth.userId }, { partnerId: auth.userId }] })

    const [byUser, byPartner] = subscriptions.reduce(
      ([u, p], item) => {
        if (item.userId === auth.userId) u.push(item)
        if (item.partnerId === auth.userId) p.push(item)
        return [u, p]
      },
      [[], []] as ReduceResult
    )

    const toMerge = byPartner
      .map(p => {
        //
        const r: ResultSubscriptionMerged = {
          actived: !!p?.actived,
          categoryId: p.categoryId,
          paid: !!p?.paid,
          partnerId: p.userId,
          userId: auth.userId, /// important
          value: p.value,
          user: p.user,
          partner: p.partner,
          category: p.category,
          createdAt: p.createdAt,
          updatedAt: p?.updatedAt,
          merged: true
        }
        const found = byUser.find(f => f.userId === auth.userId && f.partnerId === p.userId)
        return found ? null : r
        //
      })
      .filter(f => !!f)

    const data: ResultSubscriptionMerged[] = [...byUser, ...toMerge]
    return res.status(200).json({ success: true, subscriptions: data })
  }
}

function listByPartner(subService: ISubscriptionService): RequestHandler<NextApiRequest, NextApiResponse> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth } = req
    const subscriptions = await subService.list({ actived: true, partnerId: auth.userId })
    return res.status(200).json({ success: true, subscriptions })
  }
}

export function factorySubscriptionController(
  subService: ISubscriptionService,
  categoryService: ICategoryService,
  userService: IUserService,
  paymentService: IPaymentService,
  appConfigService: IAppConfigService
) {
  return {
    store: store(subService, categoryService, userService, paymentService, appConfigService),
    list: list(subService),
    remove: remove(subService),
    listByPartner: listByPartner(subService)
  }
}
