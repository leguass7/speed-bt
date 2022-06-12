import { OAuthUserConfig } from 'next-auth/providers'

export const secret = process.env.SECRET
export const googleSecrets: OAuthUserConfig<any> = {
  clientId: process.env.GOOGLE_CLIENT_ID || '',
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
}
