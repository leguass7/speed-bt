import type { NextApiResponse } from 'next'

import type { Prisma as PrismaTypes } from '.prisma/client'

import { ApiError } from 'next/dist/server/api-utils'

import { wait } from '~/helpers'
import { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'
import type { ISubscriptionService, RequestGeneratePartnerSubscription, RequestUpdateSubCategory } from '~/server-side/subscription'

function listAll(subService: ISubscriptionService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const categoryId = +req?.query?.categoryId || undefined
    const gender = (req?.query?.gender as 'F' | 'M') || undefined

    let where: PrismaTypes.SubscriptionWhereInput = { actived: true }
    if (categoryId) where.categoryId = categoryId
    if (gender) where = { ...where, user: { gender } }

    const subscriptions = await subService.list(where)
    return res.status(200).send({ success: true, subscriptions })
  }
}

function updateCategory(subService: ISubscriptionService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth } = req
    const { categoryId, subscriptionId } = req.body as RequestUpdateSubCategory

    await subService.updateMany({ id: { in: subscriptionId } }, { categoryId, updatedBy: auth.userId })
    return res.status(200).json({ success: true })
  }
}

function createPartnerSubscription(subService: ISubscriptionService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth, body } = req
    const { categoryId, partnerId, userId } = body as RequestGeneratePartnerSubscription
    const hasSub = await subService.findOne({ categoryId, userId, partnerId, actived: true })
    if (hasSub) throw new ApiError(403, 'Inscrição já existe')

    await wait(2000)
    return res.status(201).json({ success: true })
  }
}

export function factoryAdminSubscriptionController(subService: ISubscriptionService) {
  return {
    listAll: listAll(subService),
    updateCategory: updateCategory(subService),
    createPartnerSubscription: createPartnerSubscription(subService)
  }
}
