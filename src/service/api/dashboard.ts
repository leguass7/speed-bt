import type { IResponseDash } from '~/server-side/dashboard/dashboard.dto'

import { apiService } from './api.service'

export async function getDashboard(): Promise<IResponseDash> {
  const response = await apiService.get('/dashboard')
  return response
}
