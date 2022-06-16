import type { Subscription } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestHandler } from 'next-connect'
import { ApiError } from 'next/dist/server/api-utils'

import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'

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
  IResponseSubscriptions,
  IResponseSubscriptionStore
} from './subscription.dto'
import type { ISubscriptionService } from './subscription.service'

type Reduce = [IRequestStoreSubscription[], IRequestStoreSubscription[]]

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

    // deleta pagamentos antigos não realizados
    const filterPay = (f: Subscription) => !!(!f?.paid && !!f?.paymentId)
    await Promise.all(subscriptions.filter(filterPay).map(async sub => paymentService.remove(sub.paymentId)))

    const toCreatePayment = subscriptions.filter(f => !f?.paid)
    const value = toCreatePayment.reduce((acc, { value }) => (acc += value), 0)

    const paymentId = await paymentService.create({ actived: true, method: 'PIX', paid: false, value, createdBy: auth.userId, userId: auth.userId })
    await Promise.all(toCreatePayment.map(sub => subService.update(sub.id, { paymentId })))

    const user = await userService.findOneToPayment(auth.userId)
    const apiPix = await createApiPix(appConfigService)
    const cob = await paymentService.generate(apiPix, { user, value, paymentId })

    return res.status(200).json({ success: true, imageQrcode: cob.imagemQrcode, qrcode: cob.qrcode })
  }
}

function remove(subService: ISubscriptionService): RequestHandler<NextApiRequest, NextApiResponse> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth, query } = req
    const id = +query?.id

    const subscription = await subService.findOne({ actived: true, userId: auth.userId, id })
    if (!subscription) throw new ApiError(403, 'Inscrição não localizada')
    if (!!subscription?.paid) throw new ApiError(403, 'Inscrição paga não pode ser excuída')

    const success = await subService.remove(id)

    return res.status(200).json({ success })
  }
}

function list(subService: ISubscriptionService): RequestHandler<NextApiRequest, NextApiResponse<IResponseSubscriptions>> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseSubscriptions>) => {
    const { auth } = req
    const subscriptions = await subService.list({ actived: true, userId: auth.userId })
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
    remove: remove(subService)
    // updateMe: updateMe(userService),
    // me: me(userService),
    // find: find(userService)
  }
}
