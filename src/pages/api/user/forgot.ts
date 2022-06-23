import nc from 'next-connect'

import { mailService } from '~/server-side/services/EmailService'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { factoryUserController, UserService } from '~/server-side/users'
import { forgotPassSchema } from '~/server-side/users/user.validation'

const controller = factoryUserController(UserService, mailService)

const handler = nc(ncConfig).post(forgotPassSchema, controller.forgot)

export default handler
