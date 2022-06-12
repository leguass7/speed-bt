import { ApiPix } from 'brpix-api-node'

import { apiPixCredentials, certBase64 } from '~/config/credentials'

const pfx = Buffer.from(certBase64, 'base64')

export const apiPixService = new ApiPix({
  ...apiPixCredentials,
  dev: true,
  certificate: { passphrase: '', path: pfx }
})
