import { AppConfig } from '@prisma/client'

import prisma from '~/server-side/database'

async function findOne(key: AppConfig['key']): Promise<AppConfig | null> {
  const value = await prisma.appConfig.findFirst({ where: { key } })
  return value
}

export const AppConfigService = {
  findOne
}

export type IAppConfigService = typeof AppConfigService
