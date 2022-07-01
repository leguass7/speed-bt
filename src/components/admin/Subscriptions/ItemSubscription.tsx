import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import CreditScoreIcon from '@mui/icons-material/CreditScore'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { Tooltip } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { PaymentIcon } from '~/components/PaymentIcon'
import { formatPrice } from '~/helpers'
import { normalizeImageSrc, stringAvatar, stringToColor } from '~/helpers/string'
import type { ResultSubscription } from '~/server-side/subscription'
import { deleteAdminSubscription } from '~/service/api/admin'
import { checkPayment } from '~/service/api/payment'

function sxColor(name: string) {
  return { bgcolor: stringToColor(name) }
}

export type ItemSubscriptionProps = ResultSubscription & {
  onClickPix?: (paymentId: number) => void
  updateListHandler?: () => void
  manualPaidHandler?: (paymentId: number) => void
}

export const ItemSubscription: React.FC<ItemSubscriptionProps> = ({
  id,
  paid,
  paymentId,
  user,
  partner,
  value,
  createdBy,
  userId,
  onClickPix,
  updateListHandler,
  manualPaidHandler
}) => {
  const { theme } = useAppTheme()
  const [loading, setLoading] = useState(false)

  const handleClickManualPaid = useCallback(() => {
    if (manualPaidHandler) manualPaidHandler(paymentId)
  }, [manualPaidHandler, paymentId])

  const fetchPixCode = useCallback(
    (paymentId: number) => {
      return () => {
        if (onClickPix) onClickPix(paymentId)
      }
    },
    [onClickPix]
  )

  const fetchDelete = useCallback(async () => {
    setLoading(true)
    const check = await checkPayment(paymentId)
    if (!check?.paid) {
      const response = await deleteAdminSubscription(id)
      if (response?.success) {
        toast.success('Inscrição deletada')
        updateListHandler()
      }
    } else {
      toast.success('Pagamento realizado')
    }

    setLoading(false)
  }, [id, updateListHandler, paymentId])

  return (
    <List disablePadding>
      <ListItem
        disablePadding
        secondaryAction={
          <>
            {createdBy !== userId && !paid ? (
              <IconButton onClick={fetchDelete} title={`Deletar inscrição '${id}'`} disabled={!!loading}>
                <DeleteForeverIcon />
              </IconButton>
            ) : null}
            <PaymentIcon value={value} id={id} paid={!!paid} paymentId={paymentId} updateSubscriptionHandler={updateListHandler} />
            {!paid ? (
              <>
                <Tooltip title={`Gerar pagamento${value ? ` ${formatPrice(value)}` : ''}`} arrow>
                  <IconButton onClick={fetchPixCode(paymentId)}>
                    <QrCode2Icon />
                  </IconButton>
                </Tooltip>
                <Tooltip title={`Inserir pagamento manualmente`} arrow>
                  <IconButton onClick={handleClickManualPaid} sx={{ color: theme.colors.primary }}>
                    <CreditScoreIcon />
                  </IconButton>
                </Tooltip>
              </>
            ) : null}
          </>
        }
      >
        <ListItemAvatar>
          <AvatarGroup spacing="small" max={2} total={2}>
            <Avatar alt={user?.name} src={normalizeImageSrc(user?.image)} sx={sxColor(partner?.name)}>
              {stringAvatar(user?.name)}
            </Avatar>
            <Avatar alt={partner?.name} src={normalizeImageSrc(partner?.image)} sx={sxColor(partner?.name)}>
              {stringAvatar(partner?.name)}
            </Avatar>
          </AvatarGroup>
        </ListItemAvatar>
        <ListItemText primary={user?.name} secondary={partner?.name} />
      </ListItem>
    </List>
  )
}
