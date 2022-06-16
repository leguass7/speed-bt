import React, { useCallback, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'

import { CircleLoading } from '~/components/CircleLoading'
import { ButtonClose, MessageContainer } from '~/components/SearchUserDrawer/styles'
import { deleteSubscription } from '~/service/api/subscriptions'

import { Container, ContentLimit } from './styles'

type Props = {
  subscriptionId?: number
  onClose?: () => void
  onSuccess?: () => void
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
    if (response?.success) {
      if (onSuccess) onSuccess()
    }
  }, [subscriptionId, onSuccess])

  return (
    <Drawer open={!!subscriptionId} onClose={handleClose} anchor="top">
      <Container>
        <ContentLimit>
          <Divider />
          {loading ? (
            <div style={{ position: 'relative' }}>
              <CircleLoading minheight={100} />
            </div>
          ) : (
            <MessageContainer>
              <p>{'Deseja excluir inscrição'}</p>
            </MessageContainer>
          )}
          <ButtonClose color="primary" onClick={handleClose}>
            <CloseIcon />
          </ButtonClose>
        </ContentLimit>
      </Container>
    </Drawer>
  )
}
