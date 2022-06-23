import React, { useState } from 'react'

import DeleteIcon from '@mui/icons-material/Delete'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import QrCode2Icon from '@mui/icons-material/QrCode2'
import { Divider, Typography } from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { styled } from '@mui/material/styles'
import Tooltip from '@mui/material/Tooltip'
import { parseJSON, format } from 'date-fns'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { PaymentIcon } from '~/components/PaymentIcon'
import { useUserAuth } from '~/components/UserProvider'
import { formatPrice } from '~/helpers'
import { normalizeImageSrc, stringAvatar } from '~/helpers/string'

import { SelectedType, useSubscription } from '../SubscriptionProvider'
import { SpanPrice, PriceContainer } from './styles'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

type Props = SelectedType & {
  index: number
  onClickPartner?: (categoryId: number) => void
  onClickDelPartner?: (categoryId: number) => void
  onClickDelete?: (subscriptionId: number) => void
  onClickPixCode?: (paymentId: number) => void
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
  onClickPixCode,
  paid,
  paymentId,
  user,
  id,
  merged,
  createdAt
}) => {
  const [expanded, setExpanded] = useState(false)
  const { userData } = useUserAuth()
  const { theme } = useAppTheme()
  const { requestSubscriptions } = useSubscription()

  const handleClickAddPartner = () => {
    if (onClickPartner) onClickPartner(categoryId)
  }

  const handleClickDelPartner = () => {
    if (onClickDelPartner) onClickDelPartner(categoryId)
  }

  const handleClickDelele = () => {
    if (onClickDelete) onClickDelete(id)
  }

  const handleClickPixCode = () => {
    if (onClickPixCode) onClickPixCode(paymentId)
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

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const meData = user || userData
  const dataCreated = createdAt ? format(parseJSON(`${createdAt}`), 'dd/MM/yyyy') : '--'

  return (
    <Fade in={true}>
      <Card sx={{ minHeight: 216 }}>
        <CardHeader
          title={`Categoria ${category?.title || '--'}`}
          subheader={meData?.name}
          avatar={
            <Avatar aria-label={meData?.name} alt={meData?.name} src={normalizeImageSrc(meData?.image)}>
              {stringAvatar(meData?.name)}
            </Avatar>
          }
          titleTypographyProps={{ fontWeight: 'bold' }}
        />
        <CardContent>
          {partner ? (
            <List disablePadding>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={handleClickDelPartner} disabled={!!paid || !!merged}>
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar alt={partner?.name} src={normalizeImageSrc(partner?.image)}>
                    {stringAvatar(partner?.name)}
                  </Avatar>
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
          {id && !paid && !merged && paymentId ? (
            <Tooltip title={`Gerar pagamento${value ? ` ${formatPrice(value)}` : ''}`} arrow>
              <IconButton onClick={handleClickPixCode}>
                <QrCode2Icon />
              </IconButton>
            </Tooltip>
          ) : null}
          {id && !paid && !merged ? (
            <Tooltip title={`Excluir inscrição '${id}'`} arrow>
              <IconButton onClick={handleClickDelele}>
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          ) : null}
          <PaymentIcon id={id} paid={!!paid} paymentId={paymentId} updateSubscriptionHandler={requestSubscriptions} />
          {renderPrice(value)}
          {merged ? (
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
              <ExpandMoreIcon />
            </ExpandMore>
          ) : null}
        </CardActions>
        {merged ? (
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider />
            <CardContent>
              <Typography variant="h5">Atenção:</Typography>
              <Typography paragraph>
                Você foi selecionado pela sua dupla em <strong>{dataCreated}</strong>, efetue o pagamento para confirmar sua inscrição.
              </Typography>
            </CardContent>
          </Collapse>
        ) : null}
      </Card>
    </Fade>
  )
}
