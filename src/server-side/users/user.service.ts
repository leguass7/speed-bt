import type { User, Prisma as PrismaTypes } from '.prisma/client'

import { compareSync, hashSync } from 'bcrypt'
import { ApiError } from 'next/dist/server/api-utils'

import { removeInvalidValues } from '~/helpers/object'
import { isDefined } from '~/helpers/validation'
import prisma from '~/server-side/database'

import { checkCompleteData } from './user.helpers'

async function search(text: string, notIds: string[] = [], filter: PrismaTypes.UserWhereInput = {}): Promise<User[]> {
  if (text) {
    const textWhere = {
      OR: [
        { name: { contains: `%${text}%` } },
        { email: { contains: `%${text}%` } },
        { phone: { contains: `%${text}%` } },
        { cpf: { contains: `%${text}%` } }
      ]
    }
    const notWhere = { id: { notIn: notIds } }

    const users = await prisma.user.findMany({ where: { ...notWhere, ...textWhere, ...filter } })
    return users
  }
  return []
}

async function create(data: PrismaTypes.UserCreateInput): Promise<string> {
  const { password } = data
  const hash = hashSync(password, 14)

  const user = await prisma.user.create({ data: { ...data, password: hash } })
  return user && user.id
}

async function update(userId: string, { password, ...rest }: Partial<User>): Promise<string> {
  const hash = isDefined(password) ? hashSync(password, 14) : undefined
  const data = hash ? { ...rest, password: hash } : rest
  const user = await prisma.user.update({ data, where: { id: userId } })
  return user && user.id
}

async function findOne(userData: Partial<User>, select?: PrismaTypes.UserSelect): Promise<User | null> {
  const where: PrismaTypes.UserWhereInput = removeInvalidValues({ ...userData })
  const user = await prisma.user.findFirst({ where, select })
  return user as User
}

async function findOneToPayment(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      cpf: true,
      name: true,
      id: true
    }
  })
  return user
}

async function findUserComplete(userId: string): Promise<boolean> {
  const user = await findOne({ id: userId })
  if (!user) throw new ApiError(400, 'not_found')

  const completed = checkCompleteData(user)
  await update(userId, { completed })

  return completed
}

async function deleteUser(userId: string, force = false): Promise<boolean> {
  try {
    const where: PrismaTypes.UserWhereInput & PrismaTypes.UserWhereUniqueInput = { id: userId }

    if (force) await prisma.user.delete({ where })
    else await prisma.user.update({ data: { actived: false }, where })

    return true
  } catch (err) {
    return false
  }
}

async function check(email: string, password: string) {
  try {
    const user = await findOne({ email })

    const data = {
      ...user,
      password: undefined,
      cpf: undefined
    }

    return compareSync(password, user.password) && data
  } catch (err) {
    return false
  }
}

export const UserService = {
  create,
  update,
  findOne,
  deleteUser,
  findUserComplete,
  findOneToPayment,
  search,
  check
}

export type IUserService = typeof UserService
