import type { Subscription, Prisma as PrismaTypes } from '.prisma/client'

import { removeInvalidValues } from '~/helpers/object'
import prisma from '~/server-side/database'

import { CreateSubscription, ISubscription, ResultSubscription } from './subscription.dto'

async function create(data: CreateSubscription): Promise<number> {
  const result = await prisma.subscription.create({ data })
  return result && result.id
}

async function update(id: number, data: ISubscription): Promise<number> {
  const result = await prisma.subscription.update({ data, where: { id } })
  return result && result.id
}

async function updateMany(where: PrismaTypes.SubscriptionWhereInput, data: ISubscription) {
  const result = await prisma.subscription.updateMany({ data, where })
  return result
}

async function remove(id: number, force?: boolean): Promise<boolean> {
  if (force) {
    const result = await prisma.subscription.delete({ where: { id } })
    return !!result
  }
  const updated = await update(id, { actived: false })
  return !!updated
}

async function findOne(filter: PrismaTypes.SubscriptionWhereInput): Promise<Subscription | null> {
  const where = removeInvalidValues({ ...filter })
  const user = await prisma.subscription.findFirst({ where })
  return user
}

async function find(filter: PrismaTypes.SubscriptionFindManyArgs) {
  const result = await prisma.subscription.findMany(filter)
  return result || []
}

async function list(where: PrismaTypes.SubscriptionWhereInput): Promise<ResultSubscription[]> {
  const userFileds = ['actived', 'gender', 'cpf', 'birday', 'email', 'id', 'name', 'image']

  const selectUser: any = userFileds.reduce((acc, field) => {
    acc[field] = true
    return acc
  }, {})

  const data = await prisma.subscription.findMany({
    where,
    orderBy: { user: { name: 'asc' } },
    include: {
      user: { select: selectUser },
      partner: { select: selectUser },
      category: {
        select: {
          id: true,
          price: true,
          published: true,
          title: true
        }
      }
    }
  })
  return (data || []) as ResultSubscription[]
}

export const SubscriptionService = {
  create,
  findOne,
  find,
  list,
  update,
  remove,
  updateMany
}

export type ISubscriptionService = typeof SubscriptionService
