import nc from 'next-connect'

import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { CategoryService } from '~/server-side/category/category.service'
import { PaymentService } from '~/server-side/payment/payment.service'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { createBulkSubscriptionSchema, factorySubscriptionController, SubscriptionService } from '~/server-side/subscription'
import { deleteSubscriptionSchema } from '~/server-side/subscription/subscription.validation'

const controller = factorySubscriptionController(SubscriptionService, CategoryService, PaymentService)

const handler = nc(ncConfig)
  .use(authProtect)
  .get(controller.list)
  .post(createBulkSubscriptionSchema, controller.store)
  .delete(deleteSubscriptionSchema, controller.remove)
export default handler
