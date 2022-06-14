import nc from 'next-connect'

import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { factoryUserController, UserService } from '~/server-side/users'

const controller = factoryUserController(UserService)

const handler = nc(ncConfig).use(authProtect).get(controller.find)
export default handler
