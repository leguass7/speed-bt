import type { NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'

import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'

import type { IRequestStoreSubscription, IResponseSubscriptionStore } from './subscription.dto'
import type { ISubscriptionService } from './subscription.service'

function store(subService: ISubscriptionService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseSubscriptionStore>) => {
    const { id } = req.body as IRequestStoreSubscription
    const existUser = await subService.findOne({ id })
    if (existUser) throw new ApiError(400, 'Usuário já cadastrado com esse e-mail')

    // const createdId = await userService.create({ email: email.toLowerCase(), ...req.body })
    // if (!createdId) throw new ApiError(400, 'Erro ao incluir usuário')

    // const completed = await userService.findUserComplete(createdId)

    return res.status(200).json({ success: true })
  }
}

// function updateMe(userService: IUserService): RequestHandler<NextApiRequest, NextApiResponse<IResponseUserStore>> {
//   return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseUserStore>) => {
//     const { body, auth } = req

//     const userId = await userService.update(auth.userId, body)
//     if (!userId) throw new ApiError(400, 'not_found')

//     const completed = await userService.findUserComplete(userId)

//     return res.status(200).json({ success: true, userId, completed })
//   }
// }

// function me(userService: IUserService): RequestHandler<NextApiRequest, NextApiResponse<IResponseUser>> {
//   return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseUser>) => {
//     const { auth } = req
//     const user = await userService.findOne({ id: auth.userId })
//     return res.status(201).json({ success: true, user })
//   }
// }

// function find(userService: IUserService): RequestHandler<NextApiRequest, NextApiResponse<IResponseUsers>> {
//   return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseUsers>) => {
//     const { query, auth } = req
//     const users = await userService.search(`${query?.search}`, [auth.userId])
//     return res.status(200).json({ success: true, users })
//   }
// }

export function factorySubscriptionController(userService: ISubscriptionService) {
  return {
    store: store(userService)
    // updateMe: updateMe(userService),
    // me: me(userService),
    // find: find(userService)
  }
}
