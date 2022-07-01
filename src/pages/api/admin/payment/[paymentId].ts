import nc from 'next-connect'

import { createAdminMiddleware } from '~/server-side/admin/admin.middleware'
import { factoryAdminPaymentController } from '~/server-side/admin/payment/admin-payment.controller'
import { AppConfigService } from '~/server-side/app-config/app-config.service'
import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { PaymentService } from '~/server-side/payment/payment.service'
import { manualPaymentSchema } from '~/server-side/payment/payment.validation'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { SubscriptionService } from '~/server-side/subscription'
import { UserService } from '~/server-side/users'

const controller = factoryAdminPaymentController(PaymentService, SubscriptionService, AppConfigService)
const adminAuthMiddle = createAdminMiddleware([8, 9], UserService)

const handler = nc(ncConfig).use(authProtect).use(adminAuthMiddle).post(manualPaymentSchema, controller.manualSubscriptionPayment)
export default handler
