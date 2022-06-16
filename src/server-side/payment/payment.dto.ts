import { Payment, PaymentMethod } from '@prisma/client'

export type IPayment = Partial<Payment>
export type CreatePayment = {
  // id: number
  uuid?: string
  // subscriptionId: number
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
