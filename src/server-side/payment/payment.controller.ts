import type { NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'

import { createApiPix } from '../api-pix.service'
import type { IAppConfigService } from '../app-config/app-config.service'
import type { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import type { ISubscriptionService } from '../subscription'
import { IResponseCheckPayment } from './payment.dto'
import type { IPaymentService } from './payment.service'

function checkPayment(paymentService: IPaymentService, subService: ISubscriptionService, appConfigService: IAppConfigService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseCheckPayment>) => {
    const { query, auth } = req
    const paymentId = +query?.paymentId
    if (!paymentId) throw new ApiError(400, 'Pagamento não informado')

    const payment = await paymentService.findOne({ id: paymentId, userId: auth.userId })
    if (!payment) throw new ApiError(400, 'Pagamento não localizado')

    const apiPix = await createApiPix(appConfigService)
    const cob = await apiPix.consultCob(payment.txid)

    console.log('payment', cob)

    return res.status(200).send({ success: true, paid: !!payment?.paid })
  }
}

export function factoryPaymentController(paymentService: IPaymentService, subService: ISubscriptionService, appConfigService: IAppConfigService) {
  return {
    checkPayment: checkPayment(paymentService, subService, appConfigService)
    // updateMe: updateMe(userService),
    // me: me(userService),
    // find: find(userService)
  }
}
