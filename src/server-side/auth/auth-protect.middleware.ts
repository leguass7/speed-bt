import { NextApiRequest, NextApiResponse } from 'next'
import { getToken, JWT } from 'next-auth/jwt'
import { getSession } from 'next-auth/react'
import { NextHandler } from 'next-connect'

import { secret } from '~/server-side/config'

export interface IAuthorizedUser {
  userId: string
  name: string
  email?: string
}

export interface AuthorizedApiRequest extends NextApiRequest {
  auth: IAuthorizedUser
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
    if (!session) {
      session = await getSession()
      if (!session) {
        return unauthorize()
      }
    }
    req.auth = authorizedDto(session)
    next()
  } catch (error) {
    return unauthorize()
  }
}
