import nc from 'next-connect'

import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { createBulkSubscriptionSchema, factorySubscriptionController, SubscriptionService } from '~/server-side/subscription'

const controller = factorySubscriptionController(SubscriptionService)

const handler = nc(ncConfig).use(authProtect).post(createBulkSubscriptionSchema, controller.store)
export default handler
