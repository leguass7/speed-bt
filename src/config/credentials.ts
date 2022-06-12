import type { IApiPixConfig } from 'brpix-api-node'

export const apiPixCredentials: IApiPixConfig = {
  // PRODUÇÃO = false
  // HOMOLOGAÇÃO = true
  clientId: process.env.GN_CLIENT_ID,
  clientSecret: process.env.GN_CLIENT_SECRET
}

export const certBase64 = process.env.GN_CERT_BASE64
