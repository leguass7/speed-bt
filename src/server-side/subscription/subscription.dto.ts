import type { Category, Subscription, User } from '@prisma/client'

import { formatPrice } from '~/helpers'

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
  imageQrcode: string
  qrcode: string
  paymentId: number
  txid: string
}

export interface IResponseSubscription extends IResponseApi {
  subscription?: ISubscription
}

export type ResultSubscription = Subscription & { category?: Category; partner?: User; user?: User; merged?: boolean }
export interface IResponseSubscriptions extends IResponseApi {
  subscriptions?: ResultSubscription[]
}

export interface IRequestStoreSubscription {
  id?: number
  categoryId: number
  partnerId: string
  selected?: boolean
  actived?: boolean
  paid?: boolean
  paymentId?: number
  value?: number
  user?: Partial<IUser>
  partner?: Partial<IUser>
  category?: Partial<ICategory>
  merged?: boolean
}

export function requestToSubscriptionDto<T = ISubscription>(data: IRequestStoreSubscription, userId?: string): T {
  const { actived, id, category, paid, value, partnerId, categoryId } = data
  const result: ISubscription = {
    actived,
    id,
    categoryId,
    partnerId,
    paid,
    value: value || category?.price,
    userId
  }
  return result as T
}

export interface RequestUpdateSubCategory {
  categoryId: number
  subscriptionId: number[]
}

export interface RequestGeneratePartnerSubscription {
  categoryId: number
  userId: string
  partnerId: string
  // value?: number
}

//

export interface SubscriptionSheetDto {
  name: string
  phone?: string
  category: string
  gender?: string
  paid?: any
  paymentId?: number
  amount?: number | string
}

export function subscriptionToSheetDto(data: ResultSubscription): SubscriptionSheetDto {
  const { user, paid, category, paymentId, value } = data
  return {
    category: category?.title,
    paid: paid ? 'yes' : 'no',
    paymentId,
    gender: user?.gender,
    name: user?.name,
    phone: user?.phone,
    amount: formatPrice(value)
  }
}
