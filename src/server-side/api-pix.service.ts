import { ApiPix, IApiPixConfig } from 'brpix-api-node'

import type { OtherConfigValue } from './app-config/app-config.dto'
import type { IAppConfigService } from './app-config/app-config.service'

export async function createApiPix(appConfigService: IAppConfigService) {
  const base64 = await appConfigService.findKey('CERT')
  if (!base64) throw new Error('CERTIFICATE ERROR')
  const buffer = Buffer.from(base64, 'base64')

  const value = await appConfigService.findKey('OTHER')
  if (!value) throw new Error('CONFIG OTHER ERROR')

  const config: OtherConfigValue = JSON.parse(value)
  if (!config.clientId || !config.clientSecret) throw new Error('CERTIFICATE CLIENT ID ERROR')

  const apiPixCredentials: IApiPixConfig = {
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    dev: false,
    certificate: { passphrase: '', path: buffer }
  }

  const api = new ApiPix(apiPixCredentials)
  await api.init()

  return api
}
