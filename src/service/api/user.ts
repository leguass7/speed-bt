import type { IResponseUser, IResponseUserStore, IUser } from '~/server-side/users'

import { apiService } from './api.service'

export async function saveUser(data: IUser): Promise<IResponseUserStore> {
  const response = await apiService.patch('/user', data)
  return response
}

export async function createUser(data: IUser): Promise<IResponseUserStore> {
  const response = await apiService.post('/user/register', data)
  return response
}

export async function getMe(): Promise<IResponseUser> {
  const response = await apiService.get('/user/me')
  return response
}
