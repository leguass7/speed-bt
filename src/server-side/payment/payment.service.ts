import type { Payment, Prisma as PrismaTypes } from '.prisma/client'

import { removeInvalidValues } from '~/helpers/object'
import prisma from '~/server-side/database'

import { CreatePayment, IPayment } from './payment.dto'

async function create(data: CreatePayment): Promise<number> {
  const result = await prisma.payment.create({ data })
  return result && result.id
}

async function update(id: number, data: IPayment): Promise<number> {
  const result = await prisma.payment.update({ data, where: { id } })
  return result && result.id
}

async function remove(id: number): Promise<boolean> {
  const payment = await prisma.payment.findFirst({ where: { id, paid: false } })
  if (payment) {
    const result = await prisma.payment.delete({ where: { id } })
    return !!result
  }
  return null
}

async function findOne(filter: PrismaTypes.PaymentWhereInput): Promise<Payment | null> {
  const where = removeInvalidValues({ ...filter })
  const result = await prisma.payment.findFirst({ where })
  return result
}

export const PaymentService = {
  create,
  findOne,
  update,
  remove
}

export type IPaymentService = typeof PaymentService
