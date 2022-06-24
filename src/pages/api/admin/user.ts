import nc from 'next-connect'

import { createAdminMiddleware } from '~/server-side/admin/admin.middleware'
import { factoryAdminUserController } from '~/server-side/admin/user/admin-user.controller'
import { paginationSchema } from '~/server-side/admin/user/admin-user.validation'
import { authProtect } from '~/server-side/auth/auth-protect.middleware'
import { ncConfig } from '~/server-side/services/ErrorApi'
import { UserService } from '~/server-side/users'

const controller = factoryAdminUserController(UserService)
const adminAuthMiddle = createAdminMiddleware([8, 9], UserService)

const handler = nc(ncConfig).use(authProtect).use(adminAuthMiddle).get(paginationSchema, controller.paginate)
export default handler
