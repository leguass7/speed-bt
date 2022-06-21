import nc from 'next-connect'

import { AppConfigService } from '~/server-side/app-config/app-config.service'
import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { CategoryService } from '~/server-side/category/category.service'
import { PaymentService } from '~/server-side/payment/payment.service'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { factorySubscriptionController, SubscriptionService } from '~/server-side/subscription'
import { UserService } from '~/server-side/users'

const controller = factorySubscriptionController(SubscriptionService, CategoryService, UserService, PaymentService, AppConfigService)

const handler = nc(ncConfig).use(authProtect).get(controller.listByPartner)
export default handler
