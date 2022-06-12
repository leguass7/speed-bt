import React from 'react'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import CloseIcon from '@mui/icons-material/Close'
import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

import { PageTitle } from '~/components/PageTitle'
import { useUserAuth } from '~/components/UserProvider'
import { formatPrice } from '~/helpers'
import type { ICategory } from '~/server-side/category/category.dto'

export type Props = {
  categories: ICategory[]
}
export const UserSubscriptions: React.FC<Props> = ({ categories }) => {
  const { userData } = useUserAuth()
  return (
    <div>
      <PageTitle>
        <h2>Minhas inscrições</h2>
      </PageTitle>
      <br />
      <Card>
        <CardHeader
          title="Nome da categoria"
          subheader="Nome do usuário"
          avatar={
            <Avatar aria-label="recipe" src={userData?.image}>
              R
            </Avatar>
          }
        />
        <CardContent>
          <List disablePadding>
            <ListItem disablePadding>
              <ListItemAvatar>
                <Avatar alt={`s`} />
              </ListItemAvatar>
              <ListItemText primary="Nome do parceiro" />
            </ListItem>
          </List>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <AttachMoneyIcon />
          </IconButton>
          <span>{formatPrice(80)}</span> <CloseIcon />
        </CardActions>
      </Card>
    </div>
  )
}
