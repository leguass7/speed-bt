import { User, Prisma as PrismaTypes } from '.prisma/client'

import { ApiError } from 'next/dist/server/api-utils'

import { removeInvalidValues } from '~/helpers/object'
import { prisma } from '~/server-side/database'

import { checkCompleteData } from './user.helpers'

async function create(data: PrismaTypes.UserCreateInput): Promise<string> {
  const user = await prisma.user.create({ data })
  return user && user.id
}

async function update(userId: string, data: Partial<User>): Promise<string> {
  const user = await prisma.user.update({ data, where: { id: userId } })
  return user && user.id
}

async function findOne(userData: Partial<User>): Promise<User | null> {
  const where: PrismaTypes.UserWhereInput = removeInvalidValues({ ...userData })
  const user = await prisma.user.findFirst({ where })
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

export const UserService = {
  create,
  update,
  findOne,
  deleteUser,
  findUserComplete
}

export type IUserService = typeof UserService
