import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { NextHandler } from 'next-connect'

import { secret } from '~/server-side/config'

export interface IAuthorizedUser {
  userId: string
  name: string
  email?: string
  level?: number
}

export interface AuthorizedApiRequest<Body = any> extends NextApiRequest {
  auth: IAuthorizedUser
  body: Body
}

function authorizedDto(data: JWT): IAuthorizedUser {
  return {
    userId: data?.sub || '',
    name: data?.name || '',
    email: data?.email || ''
  }
}

export async function authProtect(req: AuthorizedApiRequest, res: NextApiResponse, next: NextHandler) {
  const unauthorize = (msg?: string) => res.status(401).json({ message: msg || 'não autorizado' })
  try {
    // console.log('secret', secret, process.env.NEXTAUTH_URL, process.env.VERCEL_URL)
    let session = await getToken({ req, secret })
    // console.log('session token', session)
    if (!session) {
      session = await getSession()
      // console.log('session session', session)
      if (!session) {
        return unauthorize()
      }
    }
    req.auth = authorizedDto(session)
    // console.log('req.auth', req.auth)
    if (!req.auth?.userId) return unauthorize()

    next()
  } catch (error) {
    return unauthorize()
  }
}
