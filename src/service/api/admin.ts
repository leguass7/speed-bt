import type { User } from '@prisma/client'

import type { IResponseApi, IResponsePaginated, QueryPagination } from '~/server-side/api.interface'
import type {
  IResponseSubscriptions,
  RequestUpdateSubCategory,
  ResultSubscription,
  RequestGeneratePartnerSubscription
} from '~/server-side/subscription'

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

export type AdminSubscriptionsParams = {
  gender?: 'F' | 'M'
  categoryId?: number
}
export async function getAdminSubscriptions(params?: AdminSubscriptionsParams): Promise<IResponseSubscriptions> {
  const response = await apiService.get('/admin/subscription', { params })
  return response
}

export async function updateAdminSubCategory(data?: RequestUpdateSubCategory): Promise<IResponseSubscriptions> {
  const response = await apiService.patch('/admin/subscription', data)
  return response
}

export async function generateAdminPartnerSubscription(data?: RequestGeneratePartnerSubscription): Promise<IResponseSubscriptions> {
  const response = await apiService.post('/admin/subscription', data)
  return response
}

export async function deleteAdminSubscription(id: number): Promise<IResponseSubscriptions> {
  const response = await apiService.delete('/admin/subscription', { params: { id } })
  return response
}

export type IResponsePaginatedUsers = IResponsePaginated<Partial<User>>

export async function adminPaginateUsers(params?: QueryPagination): Promise<IResponsePaginatedUsers> {
  const response = await apiService.get('/admin/user', { params })
  return response
}
