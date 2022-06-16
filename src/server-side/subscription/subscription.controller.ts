import type { NextApiRequest, NextApiResponse } from 'next'
import { RequestHandler } from 'next-connect'

import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'

import type { ICategoryService } from '../category/category.service'
import {
  IRequestStoreSubscription,
  CreateSubscription,
  requestToSubscriptionDto,
  UpdateSubscription,
  IResponseSubscriptions
} from './subscription.dto'
import type { ISubscriptionService } from './subscription.service'

type Reduce = [IRequestStoreSubscription[], IRequestStoreSubscription[]]

function store(subService: ISubscriptionService, categoryService: ICategoryService) {
  return async (req: AuthorizedApiRequest<{ data: IRequestStoreSubscription[] }>, res: NextApiResponse<any>) => {
    const { body, auth } = req
    const { data } = body

    const categories = await categoryService.list()

    const [toCreate, toUpdate] = data.reduce(
      ([c, u], item, index) => {
        const discount = !!(index >= 1)
        const found = categories.find(f => f.id === item.categoryId)
        const itemData: typeof item = { ...item, value: discount ? 50 : found.price }
        if (item?.id) u.push(itemData)
        else c.push(itemData)
        return [c, u]
      },
      [[], []] as Reduce
    )

    const created = await Promise.all(
      toCreate.map(async d => {
        const saveData = { ...requestToSubscriptionDto<CreateSubscription>(d, auth.userId), createdBy: auth.userId }
        const result = await subService.create(saveData)
        return result
      })
    )

    const updated = await Promise.all(
      toUpdate.map(async d => {
        const { id, ...saveData }: UpdateSubscription = { ...requestToSubscriptionDto<UpdateSubscription>(d), updatedBy: auth.userId }
        const result = await subService.update(id, saveData)
        return result
      })
    )

    // const { id } = req.body as IRequestStoreSubscription
    // const existUser = await subService.findOne({ id })
    // if (existUser) throw new ApiError(400, 'Usuário já cadastrado com esse e-mail')

    // const createdId = await userService.create({ email: email.toLowerCase(), ...req.body })
    // if (!createdId) throw new ApiError(400, 'Erro ao incluir usuário')

    // const completed = await userService.findUserComplete(createdId)

    return res.status(200).json({ success: true, updated, created })
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

function list(subService: ISubscriptionService): RequestHandler<NextApiRequest, NextApiResponse<IResponseSubscriptions>> {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseSubscriptions>) => {
    const { auth } = req
    const subscriptions = await subService.list({ actived: true, userId: auth.userId })
    return res.status(200).json({ success: true, subscriptions })
  }
}

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

export function factorySubscriptionController(subService: ISubscriptionService, categoryService: ICategoryService) {
  return {
    store: store(subService, categoryService),
    list: list(subService)
    // updateMe: updateMe(userService),
    // me: me(userService),
    // find: find(userService)
  }
}
