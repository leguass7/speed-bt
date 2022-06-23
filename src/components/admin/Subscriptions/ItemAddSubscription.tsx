import React from 'react'

import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import styled from 'styled-components'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { normalizeImageSrc, stringAvatar, stringToColor } from '~/helpers/string'
import type { ResultSubscription } from '~/server-side/subscription'

const Span = styled.span`
  color: ${({ theme }) => theme.colors.errors};
`

function sxColor(name: string) {
  return { bgcolor: stringToColor(name) }
}

type Props = {
  user?: ResultSubscription['user']
  partner: ResultSubscription['partner']
}
export const ItemAddSubscriptions: React.FC<Props> = ({ partner }) => {
  const { theme } = useAppTheme()

  const disabled = !partner?.cpf

  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton title="Criar inscrição" dense disabled={!!disabled}>
          <ListItemAvatar>
            <Avatar alt={partner?.name} src={normalizeImageSrc(partner?.image)} sx={sxColor(partner?.name)}>
              {stringAvatar(partner?.name)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            //
            primary={partner?.name}
            secondary={
              <>
                {disabled ? (
                  <Span>Falta completar o cadastro.</Span>
                ) : (
                  <>
                    <Span>Não inscrito</Span>. Clique para gerar a inscrição
                  </>
                )}
              </>
            }
            sx={{ color: theme.colors.primary }}
          />
        </ListItemButton>
      </ListItem>
    </List>
  )
}
