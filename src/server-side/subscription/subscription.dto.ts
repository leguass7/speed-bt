import type { Subscription } from '@prisma/client'

import type { IResponseApi } from '../api.interface'
import type { ICategory } from '../category/category.dto'
import type { IUser } from '../users'

export type ISubscription = Partial<Subscription>
export type CreateSubscription = {
  userId: string
  partnerId: string
  value: number
  categoryId: number
  paymentId?: number
  actived?: boolean
  paid?: boolean
  createdBy?: string
}

export type UpdateSubscription = Partial<CreateSubscription> & { id?: number; updatedBy?: string }

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
  actived?: boolean
  paid?: boolean
  partner?: Partial<IUser>
  category?: Partial<ICategory>
}

export function requestToSubscriptionDto<T = ISubscription>(data: IRequestStoreSubscription, userId?: string): T {
  const { actived, id, category, partner, paid } = data
  const result: ISubscription = {
    actived,
    id,
    categoryId: category?.id,
    partnerId: partner?.id,
    paid,
    value: category?.price,
    userId
  }
  return result as T
}
