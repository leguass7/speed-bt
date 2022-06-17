import type { NextApiRequest, NextApiResponse } from 'next'
import type { RequestHandler } from 'next-connect'
import { ApiError } from 'next/dist/server/api-utils'

import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'

import type { IResponseUser, IResponseUsers, IResponseUserStore, IUser } from './user.dto'
import type { IUserService } from './user.service'

function create(userService: IUserService) {
  return async (req: NextApiRequest, res: NextApiResponse<IResponseUserStore>) => {
    const { email } = req.body as IUser
    const existUser = await userService.findOne({ email })
    if (existUser) throw new ApiError(400, 'Usuário já cadastrado com esse e-mail')

    const createdId = await userService.create({ email: email.toLowerCase(), ...req.body })
    if (!createdId) throw new ApiError(400, 'Erro ao incluir usuário')

    const completed = await userService.findUserComplete(createdId)

    return res.status(201).json({ success: true, createdId, completed })
  }
}

function updateMe(userService: IUserService): RequestHandler<NextApiRequest, NextApiResponse<IResponseUserStore>> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseUserStore>) => {
    const { body, auth } = req

    const userId = await userService.update(auth.userId, body)
    if (!userId) throw new ApiError(400, 'not_found')

    const completed = await userService.findUserComplete(userId)

    return res.status(200).json({ success: true, userId, completed })
  }
}

function me(userService: IUserService): RequestHandler<NextApiRequest, NextApiResponse<IResponseUser>> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseUser>) => {
    const { auth } = req
    const user = await userService.findOne({ id: auth.userId })
    return res.status(201).json({ success: true, user })
  }
}

function find(userService: IUserService): RequestHandler<NextApiRequest, NextApiResponse<IResponseUsers>> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseUsers>) => {
    const { query, auth } = req
    const users = await userService.search(`${query?.search}`, [auth.userId])
    return res.status(200).json({ success: true, users })
  }
}

function check(userService: IUserService): RequestHandler<NextApiRequest, NextApiResponse> {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { email, password } = req.body
    const user = await userService.check(email, password)
    return res.status(200).json({ success: true, user })
  }
}

export function factoryUserController(userService: IUserService) {
  return {
    create: create(userService),
    updateMe: updateMe(userService),
    me: me(userService),
    check: check(userService),
    find: find(userService)
  }
}
