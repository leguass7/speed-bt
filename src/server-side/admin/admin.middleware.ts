import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'

import type { IAuthorizedUser } from '~/server-side/auth/auth-protect.middleware'

import { IUserService } from '../users'

export interface AuthorizedApiRequest<Body = any> extends NextApiRequest {
  auth: IAuthorizedUser
  body: Body
}

function authorizedLevelDto(data: IAuthorizedUser, level: number): IAuthorizedUser {
  return { ...data, level }
}

export function createAdminMiddleware(levels: number[], userService: IUserService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse, next: NextHandler) => {
    const unauthorize = (msg?: string) => res.status(401).json({ message: msg || 'admin não autorizado' })
    try {
      const { auth } = req
      const user = await userService.findUser({ id: auth.userId, level: { in: levels } })
      if (!user) unauthorize()
      req.auth = authorizedLevelDto(auth, user.level)
      next()
    } catch (error) {
      return unauthorize()
    }
  }
}
