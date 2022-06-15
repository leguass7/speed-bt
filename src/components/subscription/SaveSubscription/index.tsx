import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Button, Stack, Box } from '@mui/material'
import styled from 'styled-components'

import { FlexContainer } from '~/components/styled'
import { createSubscriptions } from '~/service/api/subscriptions'

import { SelectedType, useSubscription } from '../SubscriptionProvider'

const Message = styled.p`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.l}px;
`

type Validate = [keyof SelectedType, string]

const validateMessages: Validate[] = [
  ['partner', 'Selecione um parceiro(a) na categoria $1 para continuar'],
  ['category', 'Categoria não informada']
]

export const SaveSubscription: React.FC = () => {
  // const { theme } = useAppTheme()
  const [message, setMessage] = useState(null)
  const { selectedList } = useSubscription()

  const subscriptions = useMemo(() => selectedList?.filter(f => !!f?.selected), [selectedList])

  const validateSubscriptions = useCallback(() => {
    let msg = ''
    if (selectedList?.length) {
      selectedList.forEach(subscription => {
        validateMessages.forEach(([key, message]) => {
          if (!msg && !!(!(key in subscription) || !subscription[key])) msg = message.replace('$1', subscription?.category?.title || '')
        })
      })
    }
    setMessage(msg)
  }, [selectedList])

  const handleSave = useCallback(async () => {
    await createSubscriptions(subscriptions)
    toast.warn('não implementado')
  }, [subscriptions])

  useEffect(() => {
    if (subscriptions?.length) {
      validateSubscriptions()
    }
  }, [validateSubscriptions, subscriptions])

  if (!subscriptions?.length) return null

  return (
    <Box padding={2}>
      <FlexContainer justify="center" verticalPad={10}>
        <Message>{message ? message : 'Clique para continuar'}</Message>
      </FlexContainer>
      <Stack direction="row" justifyContent="center" alignItems="flex-end" spacing={1}>
        <Button variant="contained" size="large" endIcon={<AttachMoneyIcon />} disabled={!!message} onClick={handleSave}>
          Realizar pagamento
        </Button>
      </Stack>
    </Box>
  )
}
