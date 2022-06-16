import type { Category, Subscription, User } from '@prisma/client'

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
  // createdId?: string
  // userId?: string
  // completed?: boolean
  imageQrcode: string
  qrcode: string
}

export interface IResponseSubscription extends IResponseApi {
  subscription?: ISubscription
}

export type ResultSubscription = Subscription & { category?: Category; partner?: User }
export interface IResponseSubscriptions extends IResponseApi {
  subscriptions?: ResultSubscription[]
}

export interface IRequestStoreSubscription {
  id?: number
  categoryId: number
  selected?: boolean
  actived?: boolean
  paid?: boolean
  value?: number
  partner?: Partial<IUser>
  category?: Partial<ICategory>
}

export function requestToSubscriptionDto<T = ISubscription>(data: IRequestStoreSubscription, userId?: string): T {
  const { actived, id, category, partner, paid, value } = data
  const result: ISubscription = {
    actived,
    id,
    categoryId: category?.id,
    partnerId: partner?.id,
    paid,
    value: value || category?.price,
    userId
  }
  return result as T
}
