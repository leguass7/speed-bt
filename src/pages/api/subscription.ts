import nc from 'next-connect'

import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { CategoryService } from '~/server-side/category/category.service'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { createBulkSubscriptionSchema, factorySubscriptionController, SubscriptionService } from '~/server-side/subscription'

const controller = factorySubscriptionController(SubscriptionService, CategoryService)

const handler = nc(ncConfig).use(authProtect).get(controller.list).post(createBulkSubscriptionSchema, controller.store)
export default handler
