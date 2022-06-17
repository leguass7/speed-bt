import nc from 'next-connect'

import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { factoryUserController, UserService } from '~/server-side/users'
import { searchUserSchema } from '~/server-side/users/user.validation'

const controller = factoryUserController(UserService)

const handler = nc(ncConfig).use(authProtect).get(searchUserSchema, controller.find)
export default handler
