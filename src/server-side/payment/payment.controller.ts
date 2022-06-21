import type { IResponseCob } from 'brpix-api-node'
import type { NextApiResponse } from 'next'
import { ApiError } from 'next/dist/server/api-utils'

import { mergeDeep, tryJson } from '~/helpers/object'

import { createApiPix } from '../api-pix.service'
import type { IAppConfigService } from '../app-config/app-config.service'
import type { AuthorizedApiRequest } from '../auth/auth-protect.middleware'
import type { ISubscriptionService } from '../subscription'
import { IResponseCheckPayment, PaymentMeta } from './payment.dto'
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

    const paymentMeta = (tryJson(payment?.meta) || {}) as PaymentMeta

    const apiPix = await createApiPix(appConfigService)
    const cob = await apiPix.consultCob(payment.txid)

    const result = { imageQrcode: '', qrcode: '' }

    // salvar caso seja pago
    if (cob?.status === 'CONCLUIDA') {
      // FIXME: Melhorar lógica (deixar mais compreensível)

      const pixInfo = { ...cob } as IResponseCob & { pix: ResultPixPaid[] }
      const pix = pixInfo?.pix.find(f => f.txid === payment.txid)
      const payday = pix ? pix.horario : undefined
      const meta = pix ? JSON.stringify(mergeDeep({}, paymentMeta, { endToEndId: pix?.endToEndId, horario: pix?.horario })) : undefined
      await paymentService.update(payment.id, { paid: true, payday, meta, updatedBy: auth.userId })
      await subService.updateMany({ paymentId }, { paid: true, updatedBy: auth.userId })
    } else if (paymentMeta?.loc?.id) {
      const pay = await apiPix.qrcodeByLocation(paymentMeta?.loc?.id)
      result.imageQrcode = pay?.imagemQrcode
      result.qrcode = pay?.qrcode
    }

    return res.status(200).send({ success: true, paid: !!payment?.paid, ...result })
  }
}

function locPaymentPix(paymentService: IPaymentService, appConfigService: IAppConfigService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { query } = req
    const paymentId = +query?.paymentId
    const payment = await paymentService.findOne({ id: paymentId })
    if (!payment) throw new ApiError(400, 'Pagamento não localizado')
    const paymentMeta = (tryJson(payment?.meta) || {}) as PaymentMeta

    const qrcode = { imageQrCode: '', qrcode: '' }

    const apiPix = await createApiPix(appConfigService)
    if (paymentMeta?.loc?.id) {
      const pay = await apiPix.qrcodeByLocation(paymentMeta?.loc?.id)
      qrcode.imageQrCode = pay?.imagemQrcode
      qrcode.qrcode = pay?.qrcode
    }

    return res.status(200).send({ success: true, qrcode })
  }
}

export function factoryPaymentController(paymentService: IPaymentService, subService: ISubscriptionService, appConfigService: IAppConfigService) {
  return {
    checkPayment: checkPayment(paymentService, subService, appConfigService),
    locPaymentPix: locPaymentPix(paymentService, appConfigService)
    // updateMe: updateMe(userService),
    // me: me(userService),
    // find: find(userService)
  }
}
