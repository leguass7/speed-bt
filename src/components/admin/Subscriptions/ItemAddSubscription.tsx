import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

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
import { generateAdminPartnerSubscription } from '~/service/api/admin'

const Span = styled.span`
  color: ${({ theme }) => theme.colors.errors};
`

function sxColor(name: string) {
  return { bgcolor: stringToColor(name) }
}

type Props = {
  userId?: string
  partner: ResultSubscription['partner']
  categoryId: number
  updateListHandler?: () => void
}
export const ItemAddSubscriptions: React.FC<Props> = ({ partner, userId, categoryId, updateListHandler }) => {
  const { theme } = useAppTheme()
  const [loading, setLoading] = useState(false)

  const fetchGenerate = useCallback(async () => {
    setLoading(true)
    const response = await generateAdminPartnerSubscription({ categoryId, userId: partner.id, partnerId: userId })
    if (response?.success) {
      toast.success('Inscrição gerada')
      updateListHandler()
    } else {
      toast.error(response?.message || 'Error ')
    }
    setLoading(false)
    //
  }, [categoryId, userId, partner, updateListHandler])

  const disabled = !!(!partner?.cpf || !!loading)

  return (
    <List disablePadding>
      <ListItem disablePadding>
        <ListItemButton
          title="Criar inscrição"
          dense //disabled={!!disabled}
          disabled={true}
          onClick={fetchGenerate}
        >
          <ListItemAvatar>
            <Avatar alt={partner?.name} src={normalizeImageSrc(partner?.image)} sx={sxColor(partner?.name)}>
              {stringAvatar(partner?.name)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
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
