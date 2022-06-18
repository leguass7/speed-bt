import nc from 'next-connect'

import { factoryAdminConfigController } from '~/server-side/admin/config/admin-config.controller'
import { storeOtherConfigSchema } from '~/server-side/admin/config/admin-config.validation'
import { AppConfigService } from '~/server-side/app-config/app-config.service'
import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { ncConfig } from '~/server-side/services/ErrorApi'

const controller = factoryAdminConfigController(AppConfigService)

const handler = nc(ncConfig).use(authProtect).get(controller.getOne).patch(storeOtherConfigSchema, controller.store)
export default handler
