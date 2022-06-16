import type { IRequestStoreSubscription, IResponseSubscriptions } from '~/server-side/subscription'

import { apiService } from './api.service'

export async function createSubscriptions(data: IRequestStoreSubscription[]): Promise<IResponseSubscriptions> {
  const response = await apiService.post('/subscription', { data })
  return response
}

export async function listSubscriptions(): Promise<IResponseSubscriptions> {
  const response = await apiService.get('/subscription')
  return response
}

export async function deleteSubscription(id: number): Promise<IResponseSubscriptions> {
  const response = await apiService.delete('/subscription', { params: { id } })
  return response
}
