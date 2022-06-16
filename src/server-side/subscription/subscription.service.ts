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

async function findOne(filter: PrismaTypes.SubscriptionWhereInput): Promise<Subscription | null> {
  const where = removeInvalidValues({ ...filter })
  const user = await prisma.subscription.findFirst({ where })
  return user
}

async function list(where: PrismaTypes.SubscriptionWhereInput): Promise<ResultSubscription[]> {
  const data = await prisma.subscription.findMany({
    where,
    include: {
      partner: {
        select: {
          actived: true,
          gender: true,
          cpf: true,
          birday: true,
          email: true,
          id: true,
          name: true,
          image: true
        }
      },
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

// async function store({ id, ...data }: ISubscription): Promise<number> {
//   const storeData = removeInvalidValues({ ...data })
//   const result = await prisma.subscription.upsert({
//     where: id ? { id } : { id: 0 },
//     create: { ...(storeData as PrismaTypes.SubscriptionCreateInput) },
//     update: storeData
//   })
//   return result && result.id
// }

// async function update(userId: string, data: Partial<User>): Promise<string> {
//   const user = await prisma.user.update({ data, where: { id: userId } })
//   return user && user.id
// }

// async function findUserComplete(userId: string): Promise<boolean> {
//   const user = await findOne({ id: userId })
//   if (!user) throw new ApiError(400, 'not_found')

//   const completed = checkCompleteData(user)
//   await update(userId, { completed })

//   return completed
// }

// async function deleteUser(userId: string, force = false): Promise<boolean> {
//   try {
//     const where: PrismaTypes.UserWhereInput & PrismaTypes.UserWhereUniqueInput = { id: userId }

//     if (force) await prisma.user.delete({ where })
//     else await prisma.user.update({ data: { actived: false }, where })

//     return true
//   } catch (err) {
//     return false
//   }
// }

export const SubscriptionService = {
  create,
  findOne,
  // store,
  list,
  update
}

export type ISubscriptionService = typeof SubscriptionService
