import type { NextApiResponse } from 'next'

import { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'
import type { ISubscriptionService } from '~/server-side/subscription'

function listAll(subService: ISubscriptionService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const subscriptions = await subService.list({ actived: true })
    return res.status(200).send({ success: true, subscriptions })
  }
}

export function factoryAdminSubscriptionController(subService: ISubscriptionService) {
  return {
    listAll: listAll(subService)
  }
}
