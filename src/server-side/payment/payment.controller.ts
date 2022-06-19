import type { IResponseCob } from 'brpix-api-node'
import type { NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'

import { mergeDeep, tryJson } from '~/helpers/object'

import { createApiPix } from '../api-pix.service'
import type { IAppConfigService } from '../app-config/app-config.service'
import type { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import type { ISubscriptionService } from '../subscription'
import { IResponseCheckPayment } from './payment.dto'
import type { IPaymentService } from './payment.service'

type ResultPixPaid = {
  endToEndId: string
  txid: string
  valor: string
  chave: string
  horario: Date
}

function checkPayment(paymentService: IPaymentService, subService: ISubscriptionService, appConfigService: IAppConfigService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse<IResponseCheckPayment>) => {
    const { query, auth } = req
    const paymentId = +query?.paymentId
    if (!paymentId) throw new ApiError(400, 'Pagamento não informado')

    const payment = await paymentService.findOne({ id: paymentId })
    if (!payment) throw new ApiError(400, 'Pagamento não localizado')

    const apiPix = await createApiPix(appConfigService)
    const cob = await apiPix.consultCob(payment.txid)

    // salvar caso seja pago
    if (cob?.status === 'CONCLUIDA') {
      // FIXME: Melhorar lógica (deixar mais compreensível)
      const paymentMeta = tryJson(payment?.meta) || {}
      const pixInfo = { ...cob } as IResponseCob & { pix: ResultPixPaid[] }
      const pix = pixInfo?.pix.find(f => f.txid === payment.txid)
      const payday = pix ? pix.horario : undefined
      const meta = pix ? JSON.stringify(mergeDeep({}, paymentMeta, { endToEndId: pix?.endToEndId, horario: pix?.horario })) : undefined
      await paymentService.update(payment.id, { paid: true, payday, meta, updatedBy: auth.userId })
      await subService.updateMany({ paymentId }, { paid: true, updatedBy: auth.userId })
    }

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
