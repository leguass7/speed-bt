import React from 'react'

import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Typography from '@mui/material/Typography'

import { CircleLoading } from '~/components/CircleLoading'
import { PaymentIcon } from '~/components/PaymentIcon'
import { normalizeImageSrc, stringAvatar } from '~/helpers/string'
import type { IResponseSubscriptions } from '~/service/api/admin'

type Props = {
  subscriptions?: IResponseSubscriptions['subscriptions']
  loading?: boolean
  updateListHandler?: () => void
}
export const TempSubscriptions: React.FC<Props> = ({ subscriptions = [], loading, updateListHandler }) => {
  return (
    <>
      <Grid container spacing={1} padding={1}>
        {subscriptions?.map(({ id, partner, user, paid, paymentId, category }) => {
          return (
            <Grid key={`subscription-${id}`} item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Card>
                <CardHeader sx={{ padding: 1 }} title={<Typography variant="caption">Categoria: {category?.title}</Typography>} />
                <CardContent sx={{ padding: 1 }}>
                  <List disablePadding>
                    <ListItem
                      disablePadding
                      secondaryAction={<PaymentIcon id={id} paid={!!paid} paymentId={paymentId} updateSubscriptionHandler={updateListHandler} />}
                    >
                      <ListItemAvatar>
                        <AvatarGroup spacing="small" max={2} total={2}>
                          <Avatar alt={user?.name} src={normalizeImageSrc(user?.image)}>
                            {stringAvatar(user?.name)}
                          </Avatar>
                          <Avatar alt={partner?.name} src={normalizeImageSrc(partner?.image)}>
                            {stringAvatar(partner?.name)}
                          </Avatar>
                        </AvatarGroup>
                      </ListItemAvatar>
                      <ListItemText primary={user?.name} secondary={partner?.name} />
                    </ListItem>
                  </List>
                </CardContent>
                {/* <CardActions disableSpacing>
                  <IconButton edge="end" aria-label="delete" disabled={true}>
                    <DeleteIcon />
                  </IconButton>
                </CardActions> */}
              </Card>
            </Grid>
          )
        })}
      </Grid>
      {loading ? <CircleLoading /> : null}
    </>
  )
}
