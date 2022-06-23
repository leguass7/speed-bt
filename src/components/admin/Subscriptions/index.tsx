import React from 'react'

import Grid from '@mui/material/Grid'

import { CircleLoading } from '~/components/CircleLoading'
import { compareValues } from '~/helpers/array'
import type { IResponseSubscriptions } from '~/service/api/admin'

import { CardSubscription, CardSubscriptionProps } from './CartSubscription'

type PreparedSubscription = Omit<CardSubscriptionProps, 'updateListHandler' | 'onClickPix'> & { key: string }
type Props = {
  subscriptions?: IResponseSubscriptions['subscriptions']
  loading?: boolean
  updateListHandler?: () => void
  onClickPix?: (paymentId: number) => void
  loadPix?: boolean
}

const findPartner = (arr: IResponseSubscriptions['subscriptions'], id: number, categoryId: number, userId: string, partnerId: string) => {
  if (arr?.length) {
    return arr.find(f => {
      if (f.id !== id && f.categoryId === categoryId) {
        return !!(f.partnerId === userId && f.userId === partnerId)
      }
      return false
    })
  }
  return null
}

// const hasUserInResult = (arr: PreparedSubscription[], partnerId: string, categoryId?: number) => !!arr.find(f => !!(`${f.userId}` === `${partnerId}`))

function findAdded(list: PreparedSubscription[], added: AddedPair[]) {
  const result = []

  function find(userId: string) {
    for (let f = 0; f < added.length; f++) {
      const el = added[f]
      if (el?.userId === userId) {
        // console.log('achei', el.userId, userId)
        return true
      } else {
        // console.log('NÃO ACHEI ESSA MERDA', el.userId, userId)
      }
    }
    return false
  }

  for (let i = 0; i < list.length; i++) {
    const sub = list[i]
    if (!sub?.pair) result.push(sub)
    else if (find(sub.userId)) {
      result.push(sub)
    }
  }
  return result
}

type AddedPair = {
  id: number
  categoryId: number
  userId: string
}
function prepareDto(subs: IResponseSubscriptions['subscriptions']): PreparedSubscription[] {
  const added: AddedPair[] = []
  const result: PreparedSubscription[] = []

  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i]
    const foundPartner = findPartner(subs, sub.id, sub.categoryId, sub.userId, sub.partnerId)
    if (foundPartner) {
      result.push({ ...sub, key: `sub-key-${sub.id}-${foundPartner.id}`, pair: foundPartner })
      added.push({ id: foundPartner.id, categoryId: sub.categoryId, userId: foundPartner.partnerId })
    } else {
      result.push({ ...sub, key: `sub-key-${sub.id}` })
    }
  }

  return findAdded(result, added)
}

export const Subscriptions: React.FC<Props> = ({ subscriptions = [], loading, updateListHandler, onClickPix }) => {
  const preparedData = prepareDto(subscriptions.sort(compareValues('id', 'desc')))
  // console.log('subscriptions', subscriptions.length, preparedData.length)

  return (
    <>
      <Grid container spacing={1} padding={1}>
        {preparedData?.map(({ key, ...sub }) => {
          return <CardSubscription key={key} {...sub} onClickPix={onClickPix} updateListHandler={updateListHandler} />
        })}
      </Grid>
      {loading ? <CircleLoading /> : null}
    </>
  )
}
