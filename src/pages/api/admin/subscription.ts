import nc from 'next-connect'

import { createAdminMiddleware } from '~/server-side/admin/admin.middleware'
import { factoryAdminSubscriptionController } from '~/server-side/admin/subscription/admin-sub.controller'
import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { SubscriptionService } from '~/server-side/subscription'
import { listAllSubscriptionSchema } from '~/server-side/subscription/subscription.validation'
import { UserService } from '~/server-side/users'

const controller = factoryAdminSubscriptionController(SubscriptionService)
const adminAuthMiddle = createAdminMiddleware([8, 9], UserService)

const handler = nc(ncConfig).use(authProtect).use(adminAuthMiddle).get(listAllSubscriptionSchema, controller.listAll)
export default handler
