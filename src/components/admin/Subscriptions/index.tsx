import React, { useMemo } from 'react'

import Grid from '@mui/material/Grid'

import { CircleLoading } from '~/components/CircleLoading'
import type { IResponseSubscriptions } from '~/service/api/admin'

import { CardSubscription, CardSubscriptionProps } from './CartSubscription'

type PreparedSubscription = CardSubscriptionProps & { key: string }
type Props = {
  subscriptions?: IResponseSubscriptions['subscriptions']
  loading?: boolean
  updateListHandler?: () => void
  onClickPix?: (paymentId: number) => void
  loadPix?: boolean
}

export const Subscriptions: React.FC<Props> = ({ subscriptions = [], loading, updateListHandler, onClickPix }) => {
  const preparedData: PreparedSubscription[] = useMemo(() => {
    const exclude: number[] = []
    const list: PreparedSubscription[] = []

    subscriptions.forEach(sub => {
      const { userId, partnerId, categoryId, id } = sub

      const foundPartner = subscriptions.find(f => !!(f.id !== id && f.partnerId === userId && f.userId === partnerId && f.categoryId === categoryId))
      if (foundPartner) {
        list.push({ key: `sub-key-${id}-${foundPartner.id}`, pair: foundPartner, updateListHandler, onClickPix, ...sub })
      } else exclude.push(id)
    })

    return list.filter(f => !exclude.includes(f.id))
  }, [subscriptions, updateListHandler, onClickPix])

  return (
    <>
      <Grid container spacing={1} padding={1}>
        {preparedData?.map(({ key, ...sub }) => {
          return <CardSubscription key={key} {...sub} />
        })}
      </Grid>
      {loading ? <CircleLoading /> : null}
    </>
  )
}
