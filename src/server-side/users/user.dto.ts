import { User } from '@prisma/client'

import { IResponseApi } from '../api.interface'

// import type { IResponseApi } from '../api.interface'

export type IUser = Partial<Omit<User, 'password'>>

export interface IResponseUserStore extends IResponseApi {
  createdId?: string
  userId?: string
  completed?: boolean
}

export interface IResponseUser extends IResponseApi {
  user?: IUser
}
