import { IResponseApi } from '~/server-side/api.interface'

import { apiService } from './api.service'

export async function saveAdminConfig(data: Record<string, any>): Promise<IResponseApi> {
  const response = await apiService.patch('/admin/config', data)
  return response
}

export async function getAdminConfig(): Promise<IResponseApi & { data: any }> {
  const response = await apiService.get('/admin/config')
  return response
}
