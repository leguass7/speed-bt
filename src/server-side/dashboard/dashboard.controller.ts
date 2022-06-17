import type { NextApiResponse } from 'next'

import { wait } from '~/helpers'

import type { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import type { IResponseDash } from './dashboard.dto'
import { IDashboardService } from './dashboard.service'

function dash(dashService: IDashboardService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseDash>) => {
    const data = await dashService.getDash()

    await wait(2000)
    return res.status(200).send({ success: true, ...data })
  }
}

export function factoryDashboardController(dashService: IDashboardService) {
  return {
    dash: dash(dashService)
  }
}
