import React, { useCallback, useEffect, useState } from 'react'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { Button, Stack, Box } from '@mui/material'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'

import { SelectedType, useSubscription } from '../SubscriptionProvider'

type Validate = [keyof SelectedType, string]
// import { Container } from './styles';
const validateMessages: Validate[] = [
  ['partner', 'Selecione um parceiro(a) para continuar'],
  ['category', 'Categoria não informada']
]

export const SaveSubscription: React.FC = () => {
  const { theme } = useAppTheme()
  const [message, setMessage] = useState(null)
  const { selectedList } = useSubscription()

  const validateSubscriptions = useCallback(() => {
    const msg = ''
    if (selectedList?.length) {
      selectedList.forEach(subscription => {
        validateMessages.forEach(([key, message]) => {
          //
        })
        //
      })
    }
  }, [selectedList])

  useEffect(() => {
    if (selectedList?.length) {
      validateSubscriptions()
    }
  }, [validateSubscriptions, selectedList])

  return (
    <Box padding={2}>
      <Stack direction="row" justifyContent="center" alignItems="flex-end" spacing={1}>
        <Button variant="contained" size="large" endIcon={<AttachMoneyIcon />}>
          Realizar pagamento
        </Button>
      </Stack>
    </Box>
  )
}
