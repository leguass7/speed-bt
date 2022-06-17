import nc from 'next-connect'

import { AppConfigService } from '~/server-side/app-config/app-config.service'
import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { factoryPaymentController } from '~/server-side/payment/payment.controller'
import { PaymentService } from '~/server-side/payment/payment.service'
import { checkPaymentSchema } from '~/server-side/payment/payment.validation'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { SubscriptionService } from '~/server-side/subscription'

const controller = factoryPaymentController(PaymentService, SubscriptionService, AppConfigService)

const handler = nc(ncConfig).use(authProtect).get(checkPaymentSchema, controller.checkPayment)
export default handler
