import { Payment, PaymentMethod } from '@prisma/client'
import type { IRequestCreateImmediateCharge } from 'brpix-api-node'

import { IResponseApi } from '../api.interface'
import type { IUser } from '../users'

export type IPayment = Partial<Payment>
export type CreatePayment = {
  // id: number
  uuid?: string
  userId: string
  method: PaymentMethod
  value: number
  paid: boolean
  payday?: Date
  txid?: string
  overdue?: Date
  createdBy?: string
  meta?: string
  actived: boolean
}

export type GeneratePayment = {
  user: IUser
  value: number
  infos?: IRequestCreateImmediateCharge['infoAdicionais']
  paymentId: number | string
  pixKey?: string
}

export interface IResponseCheckPayment extends IResponseApi {
  paid: boolean
  // payment: IPayment
}
