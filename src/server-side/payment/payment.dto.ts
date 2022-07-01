import { Payment, PaymentMethod } from '@prisma/client'
import type { IRequestCreateImmediateCharge, IResponseCob } from 'brpix-api-node'

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
  imageQrcode?: string
  qrcode?: string
  // payment: IPayment
}

export type PaymentMeta = { loc?: IResponseCob['loc']; horario?: Date | string; endToEndId?: string }

export interface IRequestManualPayment {
  e2eId: string
}

export interface ResponseApiPixEndToEnd {
  data: {
    endToEndId: string
    valor: string
    chave: string
    horario: Date
  }
  success: true
}
