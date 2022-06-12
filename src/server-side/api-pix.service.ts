import { ApiPix } from 'brpix-api-node'

import { apiPixCredentials } from '~/config/credentials'

import type { IAppConfigService } from './app-config/app-config.service'

export async function createApiPix(appConfigService: IAppConfigService) {
  const { value: base64 } = await appConfigService.findOne('CERT')
  if (!base64) throw new Error('CERTIFICATE ERROR')

  const buffer = Buffer.from(base64, 'base64')
  const api = new ApiPix({ ...apiPixCredentials, certificate: { passphrase: '', path: buffer } })
  await api.init()

  return api
}
