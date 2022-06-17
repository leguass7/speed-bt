import type { NextApiResponse } from 'next'

import { IAppConfigService } from '~/server-side/app-config/app-config.service'
import { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'

function store(appConfigService: IAppConfigService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { body } = req

    const result = await appConfigService.store('OTHER', body)

    return res.status(200).send({ success: true, result })
  }
}

function getOne(appConfigService: IAppConfigService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const data = await appConfigService.findKey('OTHER')
    const config = data ? JSON.parse(data) : {}
    return res.status(200).send({ success: true, data: config })
  }
}

export function factoryAdminConfigController(appConfigService: IAppConfigService) {
  return {
    store: store(appConfigService),
    getOne: getOne(appConfigService)
  }
}
