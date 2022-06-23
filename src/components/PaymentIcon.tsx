import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PaidIcon from '@mui/icons-material/Paid'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import styled from 'styled-components'

import { formatPrice } from '~/helpers'
import { checkPayment } from '~/service/api/payment'

const MiniPrice = styled.span`
  font-size: 10px;
`
type Props = {
  value?: number
  paid: boolean
  paymentId?: number
  id?: number
  updateSubscriptionHandler?: () => void
}
export const PaymentIcon: React.FC<Props> = ({ id, paid, paymentId, value, updateSubscriptionHandler }) => {
  const [loading, setLoading] = useState(false)

  const updatePayments = useCallback(() => {
    if (updateSubscriptionHandler) updateSubscriptionHandler()
  }, [updateSubscriptionHandler])

  const handleCheckPayment = useCallback(async () => {
    setLoading(true)
    const response = await checkPayment(paymentId)
    const { success, message, paid } = response
    if (success) {
      if (paid) {
        toast.success('Pagamento realizado')
        updatePayments()
      }
    } else {
      toast.error(message || 'Erro ao verificar pagamento')
    }

    setLoading(false)
  }, [paymentId, updatePayments])

  return (
    <>
      {paid ? (
        <>
          {value ? <MiniPrice>{formatPrice(value)}</MiniPrice> : null}
          <Tooltip title={`Inscrição '${id}' paga, pagamanto '${paymentId}'${value ? ` - ${formatPrice(value)}` : ''}`} arrow>
            <IconButton size="small">
              <PaidIcon color="success" />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          {id && paymentId && !loading ? (
            <Tooltip title={`Verificar pagamento '${paymentId}' inscrição '${id}'${value ? ` - ${formatPrice(value)}` : ''}`} arrow>
              <IconButton aria-label="verificar pagamento" onClick={handleCheckPayment}>
                <AttachMoneyIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <IconButton aria-label="verificar pagamento" disabled={!paymentId || !!loading}>
              {loading ? <CircularProgress size={24} /> : <AttachMoneyIcon />}
            </IconButton>
          )}
        </>
      )}
    </>
  )
}
