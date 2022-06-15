import type { Subscription } from '@prisma/client'

import type { IResponseApi } from '../api.interface'
import type { ICategory } from '../category/category.dto'
import type { IUser } from '../users'

export type ISubscription = Partial<Subscription>

export interface IResponseSubscriptionStore extends IResponseApi {
  createdId?: string
  userId?: string
  completed?: boolean
}

export interface IResponseSubscription extends IResponseApi {
  subscription?: ISubscription
}

export interface IResponseSubscriptions extends IResponseApi {
  subscriptions?: ISubscription[]
}

export interface IRequestStoreSubscription {
  id: number
  selected?: boolean
  partner?: Partial<IUser>
  category?: Partial<ICategory>
}
