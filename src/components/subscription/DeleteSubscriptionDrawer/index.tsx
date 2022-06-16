import React, { useCallback, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { CircleLoading } from '~/components/CircleLoading'
import { ButtonClose, MessageContainer } from '~/components/SearchUserDrawer/styles'
import { FlexContainer, Title } from '~/components/styled'
import { deleteSubscription } from '~/service/api/subscriptions'

import { Container, ContentLimit } from './styles'

type Props = {
  subscriptionId?: number
  onClose?: () => void
  onSuccess?: (errorMessage?: string | null) => Promise<void>
}
export const DeleteSubscriptionDrawer: React.FC<Props> = ({ subscriptionId, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)

  const handleClose = useCallback(() => {
    if (onClose) onClose()
  }, [onClose])

  const fetchDelete = useCallback(async () => {
    setLoading(true)
    const response = await deleteSubscription(subscriptionId)
    setLoading(false)
    if (onSuccess) {
      onSuccess(!response?.success ? `${response?.message}` : null)
    }
  }, [subscriptionId, onSuccess])

  return (
    <Drawer open={!!subscriptionId} onClose={handleClose} anchor="top">
      <Container>
        <ContentLimit>
          <MessageContainer>
            <Title verticalPad={20}>{'Deseja excluir sua inscrição'}</Title>
            <FlexContainer justify="center" verticalPad={20} align="center">
              <Typography align="center" sx={{ fontFamily: 'Gilroy' }}>
                Essa operação não póderá ser revertida.
                <br />
                Tem certeza que você deseja excluir sua inscrição?
              </Typography>
            </FlexContainer>
          </MessageContainer>
          <Divider />
          <Stack direction="row" spacing={1} justifyContent="center" sx={{ marginTop: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              CANCELAR
            </Button>
            <Button variant="contained" onClick={fetchDelete}>
              EXCLUIR
            </Button>
          </Stack>

          {loading ? (
            <CircleLoading
              minheight={100}
              //backgroundColor="transparent"
            />
          ) : null}

          <ButtonClose color="primary" onClick={handleClose}>
            <CloseIcon />
          </ButtonClose>
        </ContentLimit>
      </Container>
    </Drawer>
  )
}
