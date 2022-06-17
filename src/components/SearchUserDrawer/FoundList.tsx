import React from 'react'

import CheckIcon from '@mui/icons-material/Check'
import ImportExportIcon from '@mui/icons-material/ImportExport'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { normalizeImageSrc } from '~/helpers/string'
import type { IUser } from '~/server-side/users'

import { MessageContainer } from './styles'

type Props = {
  list?: IUser[]
  onClickItem?: (personId: number | string) => void
  searchStarted?: boolean
  registeredGroups?: number[]
  message?: string
  notFoundMessage?: string
}

export const FoundList: React.FC<Props> = ({
  list = [],
  onClickItem,
  searchStarted,
  message = 'Buscar atletas cadastrados',
  notFoundMessage = 'Atleta não encontrado'
}) => {
  const renderSecondaryText = (email: string, hasGroup: boolean) => {
    return `${email}${hasGroup ? ` (já selecionado)` : ''}`
  }

  return (
    <>
      {list?.length ? (
        <List sx={{ maxHeight: 360, overflowY: 'scroll' }}>
          {list.map(person => {
            const hasGroup = false //findHasGroup(person?.userGroups)
            return (
              <ListItem key={person.id} disablePadding>
                <ListItemButton onClick={() => onClickItem(person.id)} disabled={!!hasGroup}>
                  <ListItemAvatar>
                    <Avatar alt={person?.name} src={normalizeImageSrc(person?.image)} />
                  </ListItemAvatar>
                  <ListItemText primary={person?.name} secondary={renderSecondaryText(person.email, hasGroup)} />
                  <ListItemIcon>{!!hasGroup ? <CheckIcon /> : <ImportExportIcon />}</ListItemIcon>
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      ) : (
        <MessageContainer>
          <p>{searchStarted ? notFoundMessage : message}</p>
        </MessageContainer>
      )}
    </>
  )
}
