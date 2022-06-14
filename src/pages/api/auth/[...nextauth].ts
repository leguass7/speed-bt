import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

import { googleSecrets, secret } from '~/server-side/config'
import prisma from '~/server-side/database'

// const authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
const maxAge = 30 * 24 * 60 * 60 // 30 days
const options: NextAuthOptions = {
  secret,
  session: { strategy: 'jwt', maxAge },
  jwt: { secret, maxAge },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: googleSecrets.clientId,
      clientSecret: googleSecrets.clientSecret,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
      // @ts-ignore
      // authorizationUrl
    })
  ]
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
