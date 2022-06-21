import type { NextApiResponse } from 'next'

import type { Prisma as PrismaTypes } from '.prisma/client'

import { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'
import type { ISubscriptionService } from '~/server-side/subscription'

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

export function factoryAdminSubscriptionController(subService: ISubscriptionService) {
  return {
    listAll: listAll(subService)
  }
}
