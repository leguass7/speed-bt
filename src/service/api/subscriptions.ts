import { IRequestStoreSubscription, IResponseSubscriptions } from '~/server-side/subscription'

import { apiService } from './api.service'

export async function createSubscriptions(data: IRequestStoreSubscription[]): Promise<IResponseSubscriptions> {
  const response = await apiService.post('/subscription', { data })
  return response
}
