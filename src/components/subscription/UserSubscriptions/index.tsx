import React, { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import Grid from '@mui/material/Grid'

import { PageTitle } from '~/components/PageTitle'
import { SearchUserDrawer } from '~/components/SearchUserDrawer'
import { FlexContainer } from '~/components/styled'
import type { ICategory } from '~/server-side/category/category.dto'
import type { IUser } from '~/server-side/users'

import { DeleteSubscriptionDrawer } from '../DeleteSubscriptionDrawer'
import { SelectedType, useSubscription } from '../SubscriptionProvider'
import { SelectMessenger } from './styles'
import { UserSubscriptionItem } from './UserSubscriptionItem'

export type Props = {
  categories?: ICategory[]
  onModifyList?: (a?: any) => void
}
export const UserSubscriptions: React.FC<Props> = ({ categories = [], onModifyList }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [importCatId, setImportCatId] = useState(0)
  const [deleteId, setDeleteId] = useState(0)
  const { selectedList, updateSelected, requestSubscriptions } = useSubscription()

  const handleDelSubscription = useCallback((subscriptionId: number) => {
    setDeleteId(subscriptionId)
  }, [])

  const onSubscriptionDelete = useCallback(
    async (errorMessage?: string) => {
      if (errorMessage) {
        toast.error(errorMessage || 'Ocorreu um erro')
      } else {
        toast.success('Inscrição apagada com sucesso')
        await requestSubscriptions()
      }
      setDeleteId(0)
    },
    [requestSubscriptions]
  )

  const handleClickAddPartner = useCallback((categoryId: number) => {
    setImportCatId(categoryId)
    setSearchOpen(true)
  }, [])

  const handleClickDelPartner = useCallback(
    (categoryId: number) => {
      updateSelected(categoryId, { partner: null })
    },
    [updateSelected]
  )

  const subscriptionList: SelectedType[] = useMemo(() => {
    const total = selectedList.length
    return selectedList
      .filter(s => categories.find(c => c.id === s.categoryId && !!s?.selected))
      .map((selected, count) => {
        const category = categories.find(c => c.id === selected.categoryId)
        let value = count >= 1 ? 50 : selected?.value || category?.price
        if (total === 1) value = category?.price
        return { ...selected, category, value }
      })
  }, [selectedList, categories])

  const handleSelectImport = useCallback(
    async (userId: IUser['id'], data?: IUser) => {
      if (importCatId) {
        const subscription = subscriptionList.find(c => c.categoryId === importCatId)
        updateSelected(importCatId, { partner: data, category: subscription.category, value: subscription.value })
        if (onModifyList) onModifyList()
      }
    },
    [importCatId, updateSelected, onModifyList, subscriptionList]
  )

  const [message, notFoundMessage] = useMemo(() => {
    const category = categories.find(f => f.id === importCatId)
    if (category) {
      const prefix = category?.title ? `${category?.title}: ` : ''
      return [
        `${prefix}Buscar atletas cadastrados`,
        //
        `${prefix}Nenhum atleta encontrado`
      ]
    }
    return [null, null]
  }, [categories, importCatId])

  return (
    <div>
      {subscriptionList?.length ? (
        <>
          <PageTitle>
            <h2>Minhas inscrições</h2>
          </PageTitle>
        </>
      ) : (
        <FlexContainer verticalPad={20} horizontalPad={10}>
          <SelectMessenger>Selecione uma categoria para se inscrever</SelectMessenger>
        </FlexContainer>
      )}

      <br />
      <Grid container spacing={1}>
        {subscriptionList?.length
          ? subscriptionList.map((subscription, index) => {
              return (
                <Grid key={`subscription-${subscription.categoryId}`} item xs={12} md={6} sm={6}>
                  <UserSubscriptionItem
                    index={index}
                    {...subscription}
                    onClickPartner={handleClickAddPartner}
                    onClickDelPartner={handleClickDelPartner}
                    onClickDelete={handleDelSubscription}
                  />
                </Grid>
              )
            })
          : null}
      </Grid>
      <SearchUserDrawer
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={handleSelectImport}
        fixedFilter={{ categoryId: importCatId }}
        message={message}
        notFoundMessage={notFoundMessage}
      />
      <DeleteSubscriptionDrawer subscriptionId={deleteId} onClose={() => setDeleteId(0)} onSuccess={onSubscriptionDelete} />
    </div>
  )
}
