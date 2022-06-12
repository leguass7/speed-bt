import type { IResponseCategories } from '~/server-side/category/category.dto'

import { apiService } from './api.service'

export async function getCategories(): Promise<IResponseCategories> {
  const response = await apiService.get('/category')
  return response
}
