import React, { useCallback, useState } from 'react'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import PaidIcon from '@mui/icons-material/Paid'
import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'

import { wait } from '~/helpers'

type Props = {
  paid: boolean
  paymentId?: number
  id?: number
}
export const PaymentIcon: React.FC<Props> = ({ id, paid, paymentId }) => {
  const [loading, setLoading] = useState(false)

  const handleCheckPayment = useCallback(async () => {
    setLoading(true)
    await wait(2000)
    setLoading(false)
  }, [])

  return (
    <>
      {paid ? (
        <Tooltip title={'Inscrição paga'} arrow>
          <IconButton aria-label="inscrição paga">
            <PaidIcon color="success" />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          {id && paymentId && !loading ? (
            <Tooltip title={'Verificar pagamento'} arrow>
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
