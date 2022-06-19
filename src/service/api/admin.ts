import type { IResponseApi } from '~/server-side/api.interface'
import type { IResponseSubscriptions, ResultSubscription } from '~/server-side/subscription'

import { apiService } from './api.service'

export type { IResponseSubscriptions, ResultSubscription }

export async function saveAdminConfig(data: Record<string, any>): Promise<IResponseApi> {
  const response = await apiService.patch('/admin/config', data)
  return response
}

export async function getAdminConfig(): Promise<IResponseApi & { data: any }> {
  const response = await apiService.get('/admin/config')
  return response
}

export async function getAdminSubscriptions(): Promise<IResponseSubscriptions> {
  const response = await apiService.get('/admin/subscription')
  return response
}
