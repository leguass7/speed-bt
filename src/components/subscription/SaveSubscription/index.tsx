import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { CircleLoading } from '~/components/CircleLoading'
import { PixCode } from '~/components/PixCode'
import { FlexContainer } from '~/components/styled'
import { useUserAuth } from '~/components/UserProvider'
import { IResponseSubscriptionStore } from '~/server-side/subscription'
import { createSubscriptions } from '~/service/api/subscriptions'

import { SelectedType, useSubscription } from '../SubscriptionProvider'
import { FormCPF, FromCPFProps } from './FormCPF'
import { ModalPixContainer } from './styles'

const Message = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.l}px;
`

type Validate = [keyof SelectedType, string]

const validateMessages: Validate[] = [
  ['category', 'Categoria não informada'],
  ['partner', 'Selecione um parceiro(a) na categoria $1 para continuar']
]

export const SaveSubscription: React.FC = () => {
  const { theme } = useAppTheme()
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const { selectedList, requestSubscriptions } = useSubscription()
  const [qrcode, setQrcode] = useState<IResponseSubscriptionStore>(null)
  const { userData, updateUserData } = useUserAuth()

  const subscriptions = useMemo(() => selectedList?.filter(f => !!f?.selected), [selectedList])

  const validateSubscriptions = useCallback(() => {
    let msg = ''
    if (subscriptions?.length) {
      subscriptions.forEach(subscription => {
        validateMessages.forEach(([key, message]) => {
          if (!!(!(key in subscription) || !subscription[key])) msg = message.replace('$1', subscription?.category?.title || '')
        })
      })
    } else {
      msg = ''
    }

    setMessage(msg)
  }, [subscriptions])

  const onReceivedPay = useCallback(
    (paid: boolean) => {
      if (!!paid) requestSubscriptions()
    },
    [requestSubscriptions]
  )

  const fetchSave = useCallback(async () => {
    setLoading(true)
    const response = await createSubscriptions(subscriptions)
    const { success, imageQrcode, qrcode, message, paymentId, txid } = response
    if (success) {
      requestSubscriptions()
      setQrcode({ imageQrcode, qrcode, paymentId, txid })
      setModalOpen(true)
    } else {
      toast.error(message)
    }
    setLoading(false)
  }, [subscriptions, requestSubscriptions])

  const checkCpf = useCallback(() => {
    if (!userData.cpf) setModalOpen(true)
    return !!userData.cpf
  }, [userData])

  const handleSave = useCallback(() => {
    if (checkCpf()) {
      if (qrcode) {
        setModalOpen(true)
      } else {
        fetchSave()
      }
    }
  }, [fetchSave, checkCpf, qrcode])

  useEffect(() => {
    if (subscriptions?.length) {
      validateSubscriptions()
    }
  }, [validateSubscriptions, subscriptions])

  const handleModalClose = (_event: any, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') setModalOpen(true)
  }

  const onSuccesCPF: FromCPFProps['onSuccess'] = async formData => {
    updateUserData({ cpf: formData?.cpf })
    await fetchSave()
  }

  const notPaid = subscriptions?.filter(f => !f?.paid)
  const enabledSave = subscriptions?.length && !message && !modalOpen && !loading && notPaid?.length

  if (!subscriptions?.length) return null

  return (
    <>
      <Box padding={2}>
        <FlexContainer justify="center" verticalPad={10}>
          <Message>{!notPaid?.length ? 'Nenhuma nova inscrição' : <>{message ? message : 'Clique para continuar'}</>}</Message>
        </FlexContainer>
        <Stack direction="row" justifyContent="center" alignItems="flex-end" spacing={1}>
          <Button variant="contained" size="large" type="button" endIcon={<AttachMoneyIcon />} disabled={!enabledSave} onClick={handleSave}>
            Realizar pagamento
          </Button>
        </Stack>
      </Box>
      {loading ? <CircleLoading /> : null}
      <Modal open={modalOpen} onClose={handleModalClose} disableEscapeKeyDown>
        <ModalPixContainer>
          <Box padding={2} sx={{ backgroundColor: theme.colors.background, borderRadius: 1 }}>
            {!userData?.cpf ? (
              <FormCPF onCancel={() => setModalOpen(false)} onSuccess={onSuccesCPF} />
            ) : (
              <PixCode
                base64QRCode={qrcode?.imageQrcode}
                stringQRCode={qrcode?.qrcode}
                onClose={() => setModalOpen(false)}
                paymentId={qrcode?.paymentId}
                txid={qrcode?.txid}
                onReceivedPay={onReceivedPay}
              />
            )}
          </Box>
        </ModalPixContainer>
      </Modal>
    </>
  )
}
