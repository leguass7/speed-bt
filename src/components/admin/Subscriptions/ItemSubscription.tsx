import React, { useCallback } from 'react'

import QrCode2Icon from '@mui/icons-material/QrCode2'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'

import { PaymentIcon } from '~/components/PaymentIcon'
import { normalizeImageSrc, stringAvatar, stringToColor } from '~/helpers/string'
import type { ResultSubscription } from '~/server-side/subscription'

function sxColor(name: string) {
  return { bgcolor: stringToColor(name) }
}

export type ItemSubscriptionProps = ResultSubscription & {
  onClickPix?: (paymentId: number) => void
  updateListHandler?: () => void
}

export const ItemSubscription: React.FC<ItemSubscriptionProps> = ({ id, paid, paymentId, user, partner, onClickPix, updateListHandler }) => {
  const fetchPixCode = useCallback(
    (paymentId: number) => {
      return () => {
        if (onClickPix) onClickPix(paymentId)
      }
    },
    [onClickPix]
  )

  return (
    <List disablePadding>
      <ListItem
        disablePadding
        secondaryAction={
          <>
            <PaymentIcon id={id} paid={!!paid} paymentId={paymentId} updateSubscriptionHandler={updateListHandler} />
            {!paid ? (
              <IconButton onClick={fetchPixCode(paymentId)}>
                <QrCode2Icon />
              </IconButton>
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
