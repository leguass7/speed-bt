import nc from 'next-connect'

import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { mailService } from '~/server-side/services/EmailService'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { factoryUserController, updateMeSchema, UserService } from '~/server-side/users'
import { createUserSchema } from '~/server-side/users/user.validation'

const controller = factoryUserController(UserService, mailService)

const handler = nc(ncConfig).post(createUserSchema, controller.create).use(authProtect).patch(updateMeSchema, controller.updateMe)
export default handler
