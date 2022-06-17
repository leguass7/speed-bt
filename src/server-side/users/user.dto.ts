import { User } from '@prisma/client'

import { IResponseApi } from '../api.interface'

// import type { IResponseApi } from '../api.interface'

export type IUser = Partial<User>

export interface IResponseUserStore extends IResponseApi {
  createdId?: string
  userId?: string
  completed?: boolean
}

export interface IResponseCheckUser extends IResponseApi {
  user?: Partial<User>
}

export interface IResponseUser extends IResponseApi {
  user?: IUser
}

export interface IResponseUsers extends IResponseApi {
  users?: IUser[]
}
