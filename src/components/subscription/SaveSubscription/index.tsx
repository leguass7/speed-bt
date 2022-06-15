import React, { useCallback, useEffect, useState } from 'react'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Button, Stack, Box } from '@mui/material'
import styled from 'styled-components'

import { FlexContainer } from '~/components/styled'

import { SelectedType, useSubscription } from '../SubscriptionProvider'

const Message = styled.p`
  text-align: center;
`

type Validate = [keyof SelectedType, string]

const validateMessages: Validate[] = [
  ['partner', 'Selecione um parceiro(a) para continuar'],
  ['category', 'Categoria não informada']
]

export const SaveSubscription: React.FC = () => {
  // const { theme } = useAppTheme()
  const [message, setMessage] = useState(null)
  const { selectedList } = useSubscription()

  const validateSubscriptions = useCallback(() => {
    let msg = ''
    if (selectedList?.length) {
      selectedList.forEach(subscription => {
        validateMessages.forEach(([key, message]) => {
          if (!msg && !(key in subscription)) msg = message
        })
        //
      })
    }
    setMessage(msg)
  }, [selectedList])

  useEffect(() => {
    if (selectedList?.length) {
      validateSubscriptions()
    }
  }, [validateSubscriptions, selectedList])

  // console.log('selectedList', selectedList)
  if (!selectedList?.length) return null

  return (
    <Box padding={2}>
      <FlexContainer justify="center" verticalPad={10}>
        <Message>{message ? message : 'Clique para continuar'}</Message>
      </FlexContainer>
      <Stack direction="row" justifyContent="center" alignItems="flex-end" spacing={1}>
        <Button variant="contained" size="large" endIcon={<AttachMoneyIcon />} disabled={!!message}>
          Realizar pagamento
        </Button>
      </Stack>
    </Box>
  )
}
