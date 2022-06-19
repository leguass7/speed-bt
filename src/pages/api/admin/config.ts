import nc from 'next-connect'

import { createAdminMiddleware } from '~/server-side/admin/admin.middleware'
import { factoryAdminConfigController } from '~/server-side/admin/config/admin-config.controller'
import { storeOtherConfigSchema } from '~/server-side/admin/config/admin-config.validation'
import { AppConfigService } from '~/server-side/app-config/app-config.service'
import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { UserService } from '~/server-side/users'

const controller = factoryAdminConfigController(AppConfigService)
const adminAuthMiddle = createAdminMiddleware([8, 9], UserService)

const handler = nc(ncConfig).use(authProtect).use(adminAuthMiddle).get(controller.getOne).patch(storeOtherConfigSchema, controller.store)
export default handler
