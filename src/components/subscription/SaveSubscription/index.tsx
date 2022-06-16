import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import styled from 'styled-components'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { PixCode } from '~/components/PixCode'
import { FlexContainer } from '~/components/styled'
import { IResponseSubscriptionStore } from '~/server-side/subscription'
import { createSubscriptions } from '~/service/api/subscriptions'

import { SelectedType, useSubscription } from '../SubscriptionProvider'
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
  const [modalOpen, setModalOpen] = useState(false)
  const [message, setMessage] = useState(null)
  const { selectedList } = useSubscription()
  const [qrcode, setQrcode] = useState<IResponseSubscriptionStore>(null)

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

  const handleSave = useCallback(async () => {
    if (qrcode) {
      setModalOpen(true)
    } else {
      const response = await createSubscriptions(subscriptions)
      const { success, imageQrcode, qrcode, message } = response
      if (success) {
        setQrcode({ imageQrcode, qrcode })
        setModalOpen(true)
      } else {
        toast.error(message)
      }
    }
  }, [subscriptions, qrcode])

  const handleModalClose = (_event: any, reason: 'backdropClick' | 'escapeKeyDown') => {
    if (reason === 'backdropClick') setModalOpen(true)
    //
  }

  useEffect(() => {
    if (subscriptions?.length) {
      validateSubscriptions()
    }
  }, [validateSubscriptions, subscriptions])

  const enabledSave = subscriptions?.length && !message

  if (!subscriptions?.length) return null

  return (
    <>
      <Box padding={2}>
        <FlexContainer justify="center" verticalPad={10}>
          <Message>{message ? message : 'Clique para continuar'}</Message>
        </FlexContainer>
        <Stack direction="row" justifyContent="center" alignItems="flex-end" spacing={1}>
          <Button variant="contained" size="large" endIcon={<AttachMoneyIcon />} disabled={!enabledSave} onClick={handleSave}>
            Realizar pagamento
          </Button>
        </Stack>
      </Box>
      <Modal open={modalOpen} onClose={handleModalClose} keepMounted disableEscapeKeyDown>
        <ModalPixContainer>
          <Box padding={2} sx={{ backgroundColor: theme.colors.background, borderRadius: 1 }}>
            <PixCode base64QRCode={qrcode.imageQrcode} stringQRCode={qrcode.qrcode} onClose={() => setModalOpen(false)} />
          </Box>
        </ModalPixContainer>
      </Modal>
    </>
  )
}
