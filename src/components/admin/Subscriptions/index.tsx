import React from 'react'

import Grid from '@mui/material/Grid'

import { CircleLoading } from '~/components/CircleLoading'
import { Paragraph } from '~/components/styled'
import { compareValues } from '~/helpers/array'
import type { IResponseSubscriptions } from '~/service/api/admin'

import { CardSubscription, CardSubscriptionProps } from './CartSubscription'

type ResponseSubscriptions = IResponseSubscriptions['subscriptions']
type PreparedSubscription = Omit<CardSubscriptionProps, 'updateListHandler' | 'onClickPix'> & { key: string }
type Props = {
  subscriptions?: ResponseSubscriptions
  loading?: boolean
  updateListHandler?: () => void
  onClickPix?: (paymentId: number) => void
  loadPix?: boolean
}

const findPartner = (arr: ResponseSubscriptions, id: number, categoryId: number, userId: string, partnerId: string) => {
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

function prepareDto(subs: ResponseSubscriptions): PreparedSubscription[] {
  const result: PreparedSubscription[] = []

  for (let i = 0; i < subs.length; i++) {
    const sub = subs[i]
    const foundPartner = findPartner(subs, sub.id, sub.categoryId, sub.userId, sub.partnerId)

    if (foundPartner) {
      result.push({ ...sub, key: `a-key-${sub.id}-${foundPartner.id}`, pair: foundPartner })
    } else {
      result.push({ ...sub, key: `b-key-${sub.id}` })
    }
  }
  const excludes: number[] = []
  const allowed: number[] = []

  result.forEach(r => {
    if (allowed.includes(r.id)) {
      //
    } else {
      if (r.pair?.id) {
        if (!allowed.includes(r?.pair?.id)) excludes.push(r?.pair?.id)
        if (!excludes.includes(r?.id)) allowed.push(r?.id)
      } else {
        allowed.push(r?.id)
      }
    }
  })

  // console.log('excludes', excludes.length, excludes)
  // console.log('allowed', allowed.length, allowed)

  return result.filter(f => !excludes.includes(f.id)).sort(compareValues('key', 'desc')) //findAdded(result, added)
}

export const Subscriptions: React.FC<Props> = ({ subscriptions = [], loading, updateListHandler, onClickPix }) => {
  const preparedData = prepareDto(subscriptions.sort(compareValues('id', 'desc')))

  const total = preparedData.reduce((acc, sub) => {
    if (sub?.pair) acc += 2
    else acc += 1
    return acc
  }, 0)

  return (
    <>
      <Paragraph horizontalSpaced>Total: {total} inscrições</Paragraph>
      <Grid container spacing={1} padding={1}>
        {preparedData?.map(({ key, ...sub }) => {
          return <CardSubscription key={key} {...sub} onClickPix={onClickPix} updateListHandler={updateListHandler} />
        })}
      </Grid>

      {loading ? <CircleLoading /> : null}
    </>
  )
}
