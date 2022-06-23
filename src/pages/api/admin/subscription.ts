import nc from 'next-connect'

import { createAdminMiddleware } from '~/server-side/admin/admin.middleware'
import { factoryAdminSubscriptionController } from '~/server-side/admin/subscription/admin-sub.controller'
import { createPartnerSubscriptionSchema } from '~/server-side/admin/subscription/admin-sub.validation'
import { AppConfigService } from '~/server-side/app-config/app-config.service'
import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { CategoryService } from '~/server-side/category/category.service'
import { PaymentService } from '~/server-side/payment/payment.service'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { SubscriptionService } from '~/server-side/subscription'
import { listAllSubscriptionSchema } from '~/server-side/subscription/subscription.validation'
import { UserService } from '~/server-side/users'

const controller = factoryAdminSubscriptionController(SubscriptionService, CategoryService, PaymentService, UserService, AppConfigService)
const adminAuthMiddle = createAdminMiddleware([8, 9], UserService)

const handler = nc(ncConfig)
  .use(authProtect)
  .use(adminAuthMiddle)
  .get(listAllSubscriptionSchema, controller.listAll)
  .patch(controller.updateCategory)
  .post(createPartnerSubscriptionSchema, controller.createPartnerSubscription)
export default handler
