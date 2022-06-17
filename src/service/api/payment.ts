import type { IResponseCheckPayment } from '~/server-side/payment/payment.dto'

import { apiService } from './api.service'

export async function checkPayment(paymentId: number): Promise<IResponseCheckPayment> {
  const response = await apiService.get(`/payment/${paymentId}`)
  return response
}

// export async function listSubscriptions(): Promise<IResponseSubscriptions> {
//   const response = await apiService.get('/subscription')
//   return response
// }

// export async function deleteSubscription(id: number): Promise<IResponseSubscriptions> {
//   const response = await apiService.delete('/subscription', { params: { id } })
//   return response
// }
