import { AppConfig, Prisma as PrismaTypes } from '@prisma/client'

import { mergeDeep } from '~/helpers/object'
import prisma from '~/server-side/database'

async function findKey(key: AppConfig['key']): Promise<string> {
  const data = await prisma.appConfig.findFirst({ where: { key } })
  return data?.value
}

async function findOne(id: number): Promise<AppConfig | null> {
  const value = await prisma.appConfig.findUnique({ where: { id } })
  return value
}

async function update(id: number, data: PrismaTypes.AppConfigUpdateInput): Promise<AppConfig | null> {
  const value = await prisma.appConfig.update({ where: { id }, data })
  return value
}

async function store(key: AppConfig['key'], value: any): Promise<AppConfig | null> {
  const data = await prisma.appConfig.findFirst({ where: { key } })
  if (data) {
    const config = data?.value ? JSON.parse(data.value) : {}
    const merge = mergeDeep({}, config, value)

    const updated = await update(data?.id, { value: JSON.stringify(merge) })
    return updated
  }

  const d: PrismaTypes.AppConfigCreateInput = { key, value: JSON.stringify(value) }
  const created = await prisma.appConfig.create({ data: d })
  return created
}

export const AppConfigService = {
  findOne,
  update,
  store,
  findKey
}

export type IAppConfigService = typeof AppConfigService
