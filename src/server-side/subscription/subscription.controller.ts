import type { Subscription } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestHandler } from 'next-connect'
import { ApiError } from 'next/dist/server/api-utils'

import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'

import type { ICategoryService } from '../category/category.service'
import type { IPaymentService } from '../payment/payment.service'
import {
  IRequestStoreSubscription,
  CreateSubscription,
  requestToSubscriptionDto,
  UpdateSubscription,
  IResponseSubscriptions
} from './subscription.dto'
import type { ISubscriptionService } from './subscription.service'

type Reduce = [IRequestStoreSubscription[], IRequestStoreSubscription[]]

function store(subService: ISubscriptionService, categoryService: ICategoryService, paymentService: IPaymentService) {
  return async (req: AuthorizedApiRequest<{ data: IRequestStoreSubscription[] }>, res: NextApiResponse<any>) => {
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
    await Promise.all(subscriptions.filter(filterPay).map(sub => paymentService.remove(sub.paymentId)))

    const toCreatePayment = subscriptions.filter(f => !f?.paid)
    console.log('toCreatePayment', toCreatePayment)
    // criar pagamento

    // responser qrcode para o cliente

    return res.status(200).json({ success: true, updated, created })
  }
}

function remove(subService: ISubscriptionService): RequestHandler<NextApiRequest, NextApiResponse> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth, query } = req
    const id = +query?.id

    const subscription = await subService.findOne({ actived: true, userId: auth.userId, id })
    if (!subscription) throw new ApiError(403, 'Inscrição não localizada')
    if (!!subscription?.paid) throw new ApiError(403, 'Inscrição paga não pode ser excuída')

    return res.status(200).json({ success: true })
  }
}

function list(subService: ISubscriptionService): RequestHandler<NextApiRequest, NextApiResponse<IResponseSubscriptions>> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseSubscriptions>) => {
    const { auth } = req
    const subscriptions = await subService.list({ actived: true, userId: auth.userId })
    return res.status(200).json({ success: true, subscriptions })
  }
}

export function factorySubscriptionController(subService: ISubscriptionService, categoryService: ICategoryService, paymentService: IPaymentService) {
  return {
    store: store(subService, categoryService, paymentService),
    list: list(subService),
    remove: remove(subService)
    // updateMe: updateMe(userService),
    // me: me(userService),
    // find: find(userService)
  }
}
