import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextApiHandler } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'

import { googleSecrets, secret } from '~/server-side/config'
import prisma from '~/server-side/database'
import { UserService } from '~/server-side/users'

// const authorizationUrl = 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code'
const maxAge = 30 * 24 * 60 * 60 // 30 days
const options: NextAuthOptions = {
  secret,
  session: { strategy: 'jwt', maxAge },
  jwt: { secret, maxAge },
  adapter: PrismaAdapter(prisma),
  // pages: {
  //   signIn: '/login'
  // },
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
    }),
    CredentialsProvider({
      id: 'custom',
      name: 'custom',
      credentials: {
        email: {},
        password: { type: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials

        const user = await UserService.check(email, password)

        console.log('asldlkaslkdlkas', user, req, credentials)

        return { ...user }
      }
    })
  ],
  debug: true
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler
