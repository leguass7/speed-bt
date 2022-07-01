import type { NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'

import { createApiPix } from '~/server-side/api-pix.service'
import type { IAppConfigService } from '~/server-side/app-config/app-config.service'
import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'
import type { ResponseApiPixEndToEnd } from '~/server-side/payment/payment.dto'
import type { IPaymentService } from '~/server-side/payment/payment.service'
import type { ISubscriptionService } from '~/server-side/subscription'

function manualPayment(paymentService: IPaymentService, subService: ISubscriptionService, appConfigService: IAppConfigService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { auth, body, query } = req
    const paymentId = +query?.paymentId
    const e2eId = body?.e2eId as string

    const payment = await paymentService.findOne({ id: paymentId })
    if (!payment) throw new ApiError(400, 'Pagamento não localizado')

    const apiPix = await createApiPix(appConfigService)
    await apiPix.init()
    const response = await apiPix.requestApi<ResponseApiPixEndToEnd>('get', `/v2/pix/${e2eId}`)
    if (!response?.success) throw new ApiError(400, 'Identificador não localizado')

    const payData = response?.data
    const updatedBy = auth.userId

    await paymentService.update(paymentId, {
      updatedBy,
      value: Number(payData?.valor),
      txid: payData.endToEndId,
      paid: true,
      payday: payData?.horario
    })

    await subService.updateMany({ paymentId }, { updatedBy, paid: true })

    return res.status(200).json({ success: true, paymentId, e2eId, paid: true })
  }
}

export function factoryAdminPaymentController(
  paymentService: IPaymentService,
  subService: ISubscriptionService,
  appConfigService: IAppConfigService
) {
  return {
    manualSubscriptionPayment: manualPayment(paymentService, subService, appConfigService)
  }
}
