import nc from 'next-connect'

import { ncConfig } from '~/server-side/services/ErrorApi'
import { factoryUserController, UserService } from '~/server-side/users'
import { checkUserSchema } from '~/server-side/users/user.validation'

const controller = factoryUserController(UserService)

const handler = nc(ncConfig).post(checkUserSchema, controller.check)

export default handler
