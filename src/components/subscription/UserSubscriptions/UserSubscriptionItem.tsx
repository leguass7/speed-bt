import React from 'react'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { useUserAuth } from '~/components/UserProvider'
import { formatPrice } from '~/helpers'
import { normalizeImageSrc } from '~/helpers/string'

import type { SelectedType } from '../SubscriptionProvider'
import { SpanPrice, PriceContainer } from './styles'

type Props = SelectedType & {
  index: number
  onClickPartner?: (categoryId: number) => void
  onClickDelPartner?: (categoryId: number) => void
  onClickDelete?: (subscriptionId: number) => void
}
export const UserSubscriptionItem: React.FC<Props> = ({
  index,
  value = 100,
  categoryId,
  partner,
  category,
  onClickPartner,
  onClickDelPartner,
  onClickDelete,
  id
}) => {
  const { userData } = useUserAuth()
  const { theme } = useAppTheme()

  const handleClickAddPartner = () => {
    if (onClickPartner) onClickPartner(categoryId)
  }

  const handleClickDelPartner = () => {
    if (onClickDelPartner) onClickDelPartner(categoryId)
  }

  const handleClickDelele = () => {
    if (onClickDelete) onClickDelete(id)
  }

  const renderPrice = (value: number) => {
    const discount = !!(index >= 1 && value !== category?.price)
    return (
      <PriceContainer>
        {discount ? (
          <>
            <SpanPrice line>{formatPrice(category?.price)}</SpanPrice> por <SpanPrice>{formatPrice(value)}</SpanPrice>
          </>
        ) : (
          <SpanPrice>{formatPrice(value)}</SpanPrice>
        )}
      </PriceContainer>
    )
  }
  return (
    <Fade in={true}>
      <Card sx={{ minHeight: 216 }}>
        <CardHeader
          title={`Categoria ${category?.title || '--'}`}
          subheader={userData?.name}
          avatar={<Avatar aria-label={userData?.name} alt={userData?.name} src={normalizeImageSrc(userData?.image)} />}
          titleTypographyProps={{ fontWeight: 'bold' }}
        />
        <CardContent>
          {partner ? (
            <List disablePadding>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={handleClickDelPartner}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={partner?.name} src={normalizeImageSrc(partner?.image)} />
                </ListItemAvatar>
                <ListItemText primary={partner?.name} secondary={partner?.email} />
              </ListItem>
            </List>
          ) : (
            <List disablePadding>
              <ListItemButton onClick={handleClickAddPartner}>
                <ListItemText primary="Clique aqui para selecionar um parceiro(a)" sx={{ color: theme.colors.primary }} />
              </ListItemButton>
            </List>
          )}
        </CardContent>
        <CardActions disableSpacing>
          {id ? (
            <IconButton aria-label="excluir inscrição" onClick={handleClickDelele}>
              <DeleteForeverIcon />
            </IconButton>
          ) : null}
          <IconButton aria-label="verificar pagamento">
            <AttachMoneyIcon />
          </IconButton>
          {renderPrice(value)}

          {/* <CloseIcon /> */}
        </CardActions>
      </Card>
    </Fade>
  )
}
