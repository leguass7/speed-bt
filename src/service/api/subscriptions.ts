import type { IRequestStoreSubscription, IResponseSubscriptions, IResponseSubscriptionStore } from '~/server-side/subscription'

import { apiService } from './api.service'

export async function createSubscriptions(data: IRequestStoreSubscription[]): Promise<IResponseSubscriptionStore> {
  const response = await apiService.post('/subscription', { data })
  return response
}

export async function listSubscriptions(byPartner?: boolean): Promise<IResponseSubscriptions> {
  const url = byPartner ? '/subscription/partner' : '/subscription'
  const response = await apiService.get(url)
  return response
}

export async function deleteSubscription(id: number): Promise<IResponseSubscriptions> {
  const response = await apiService.delete('/subscription', { params: { id } })
  return response
}
