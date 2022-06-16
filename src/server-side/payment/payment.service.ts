import type { Payment, Prisma as PrismaTypes } from '.prisma/client'

import type { ApiPix } from 'brpix-api-node'

import { removeInvalidValues } from '~/helpers/object'
import { removeAll } from '~/helpers/string'
import prisma from '~/server-side/database'

import { CreatePayment, IPayment, GeneratePayment } from './payment.dto'

async function generate(apiPix: ApiPix, { user, value, infos: infoAdicionais, paymentId, pixKey: chave }: GeneratePayment) {
  const cob = await apiPix.createCob({
    calendario: { expiracao: 3600 },
    devedor: { cpf: removeAll(user?.cpf), nome: user.name },
    valor: { original: Number(`${value}`).toFixed(2) },
    chave: chave || 'lesbr3@gmail.com',
    solicitacaoPagador: `ARENA BT ${paymentId}`,
    infoAdicionais
  })
  if (!cob || !cob?.txid || !cob.loc) return null

  const qrcode = await apiPix.qrcodeByLocation(cob.loc.id)

  await update(Number(`${paymentId}`), { txid: cob.txid })

  return { ...cob, ...qrcode }
}

async function create(data: CreatePayment): Promise<number> {
  const result = await prisma.payment.create({ data })
  return result && result.id
}

async function update(id: number, data: IPayment): Promise<number> {
  const result = await prisma.payment.update({ data, where: { id } })
  return result && result.id
}

async function remove(id: number, force?: boolean): Promise<boolean> {
  const payment = await prisma.payment.findFirst({ where: { id, paid: false } })
  if (payment) {
    if (force) {
      const result = await prisma.payment.delete({ where: { id } })
      return !!result
    }
    const updated = await update(id, { actived: false })
    return !!updated
  }
  return null
}

async function findOne(filter: PrismaTypes.PaymentWhereInput): Promise<Payment | null> {
  const where = removeInvalidValues({ ...filter })
  const result = await prisma.payment.findFirst({ where })
  return result
}

export const PaymentService = {
  generate,
  create,
  findOne,
  update,
  remove
}

export type IPaymentService = typeof PaymentService
