import nc from 'next-connect'

import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { mailService } from '~/server-side/services/EmailService'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { factoryUserController, UserService } from '~/server-side/users'

const controller = factoryUserController(UserService, mailService)

const handler = nc(ncConfig).use(authProtect).get(controller.me)
export default handler
