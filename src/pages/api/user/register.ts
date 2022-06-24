import nc from 'next-connect'

import { mailService } from '~/server-side/services/EmailService'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { factoryUserController, UserService } from '~/server-side/users'
import { createUserSchema } from '~/server-side/users/user.validation'

const controller = factoryUserController(UserService, mailService)

const handler = nc(ncConfig).post(createUserSchema, controller.create)
export default handler
