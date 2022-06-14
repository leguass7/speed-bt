import React, { useCallback, useMemo, useState } from 'react'

// import { toast } from 'react-toastify'

import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
// import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from '@mui/material'
import Fade from '@mui/material/Fade'
import styled from 'styled-components'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { PageTitle } from '~/components/PageTitle'
import { SearchUserDrawer } from '~/components/SearchUserDrawer'
import { useUserAuth } from '~/components/UserProvider'
import { formatPrice } from '~/helpers'
import { normalizeImageSrc } from '~/helpers/string'
import type { ICategory } from '~/server-side/category/category.dto'
import type { IUser } from '~/server-side/users'

import { useSubscription } from '../SubscriptionProvider'

const Span = styled.span<{ line?: boolean }>`
  text-decoration: ${({ line }) => (line ? 'line-through' : 'none')};
  font-size: ${({ line }) => (line ? 14 : 16)}px;
`

export type Props = {
  categories?: ICategory[]
  onModifyList?: (a?: any) => void
}
export const UserSubscriptions: React.FC<Props> = ({ categories = [], onModifyList }) => {
  const { theme } = useAppTheme()
  const [searchOpen, setSearchOpen] = useState(false)
  const [importCatId, setImportCatId] = useState(0)
  const { selectedList, updateSelected } = useSubscription()

  const { userData } = useUserAuth()

  const handleClickAddPartner = useCallback((id: number) => {
    return () => {
      setImportCatId(id)
      setSearchOpen(true)
    }
  }, [])

  const handleClickDelPartner = useCallback(
    (id: number) => {
      return () => {
        updateSelected(id, { partner: null })
      }
    },
    [updateSelected]
  )

  const handleSelectImport = useCallback(
    async (userId: IUser['id'], data?: IUser) => {
      if (importCatId) {
        updateSelected(importCatId, { partner: data })
        if (onModifyList) onModifyList()
      }
    },
    [importCatId, updateSelected, onModifyList]
  )

  const subscriptionList = useMemo(() => {
    return selectedList
      .filter(s => categories.find(c => c.id === s.id && !!s?.selected))
      .map(selected => {
        const category = categories.find(c => c.id === selected.id)
        return {
          category,
          ...selected
        }
      })
  }, [selectedList, categories])

  const renderPrice = (value: number, discount: boolean) => {
    if (discount) {
      return (
        <Span className="flex">
          <Span line>{formatPrice(value)}</Span> por <Span>{formatPrice(50)}</Span>
        </Span>
      )
    }
    return <Span>{formatPrice(value)}</Span>
  }

  return (
    <div>
      {subscriptionList?.length ? (
        <>
          <PageTitle>
            <h2>Minhas inscrições</h2>
          </PageTitle>
        </>
      ) : (
        <p>Selecione uma categoria para se inscrever</p>
      )}

      <br />
      <Grid container spacing={1}>
        {subscriptionList?.length
          ? subscriptionList.map(({ category, partner, id }, i) => {
              return (
                <Grid key={`subscription-${id}`} item xs={12} md={6} sm={6}>
                  <Fade in={true}>
                    <Card>
                      <CardHeader
                        title={`Categoria ${category?.title || '--'}`}
                        subheader={userData?.name}
                        avatar={<Avatar aria-label={userData?.name} alt={userData?.name} src={normalizeImageSrc(userData?.image)} />}
                      />
                      <CardContent>
                        {partner ? (
                          <List disablePadding>
                            <ListItem
                              disablePadding
                              secondaryAction={
                                <IconButton edge="end" aria-label="delete" onClick={handleClickDelPartner(id)}>
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
                            <ListItemButton onClick={handleClickAddPartner(id)}>
                              <ListItemText primary="Clique aqui para selecionar um parceiro(a)" sx={{ color: theme.colors.contrast }} />
                            </ListItemButton>
                          </List>
                        )}
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                          <AttachMoneyIcon />
                        </IconButton>
                        {renderPrice(category?.price || 100, !!(i > 0))}

                        {/* <CloseIcon /> */}
                      </CardActions>
                    </Card>
                  </Fade>
                </Grid>
              )
            })
          : null}
      </Grid>
      <SearchUserDrawer registeredGroups={[7]} open={searchOpen} onClose={() => setSearchOpen(false)} onSelect={handleSelectImport} />
    </div>
  )
}
