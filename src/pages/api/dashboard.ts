import nc from 'next-connect'

import { factoryDashboardController } from '~/server-side/dashboard/dashboard.controller'
import { DashboardService } from '~/server-side/dashboard/dashboard.service'
import { ncConfig } from '~/server-side/services/ErrorApi'

const controller = factoryDashboardController(DashboardService)

const handler = nc(ncConfig).get(controller.dash)
export default handler
