import React, { createContext, useCallback, useContext, useState } from 'react'

import type { IRequestStoreSubscription, IResponseSubscriptions, ResultSubscription } from '~/server-side/subscription'
import { listSubscriptions } from '~/service/api/subscriptions'

export interface ISubscriptionContext {
  loading?: boolean
  selectedList?: SelectedType[]
  setSelectedList?: React.Dispatch<React.SetStateAction<SelectedType[]>>
  requestSubscriptions?: () => Promise<IResponseSubscriptions>
}

export const SubscriptionContext = createContext({} as ISubscriptionContext)

export type SelectedType = Omit<IRequestStoreSubscription, 'id'> & { readonly id?: number }

function subscriptionDto(data: ResultSubscription): SelectedType {
  const { id, paid, category, partner, categoryId, value, paymentId } = data
  const result: SelectedType = {
    id,
    paid,
    selected: true,
    categoryId: categoryId || category?.id,
    category: { id: category?.id, title: category?.title },
    partner: { ...partner },
    value,
    paymentId
  }
  return result
}

type ProviderProps = {
  children: React.ReactNode
}
export const SubscriptionProvider: React.FC<ProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState<ISubscriptionContext['loading']>(false)
  const [selectedList, setSelectedList] = React.useState<SelectedType[]>([])

  const requestSubscriptions = useCallback(async () => {
    setLoading(true)
    const response = await listSubscriptions()
    if (response.success) {
      const subs = (response?.subscriptions || []).map(subscriptionDto)
      setSelectedList(subs)
      // setSelectedList(old => {
      //   const filtered = old.filter(f => !!subs.find(s => s.categoryId !== f.categoryId))
      //   return [...subs, ...filtered]
      // })
      response?.subscriptions?.map(_sub => {
        // console.log('SubscriptionProvider requestSubscriptions', sub)
        // console.log('SubscriptionProvider requestSubscriptions', subscriptionDto(sub))
      })
    }
    setLoading(false)
    return response
  }, [])

  return (
    <SubscriptionContext.Provider value={{ loading, selectedList, setSelectedList, requestSubscriptions }}>{children}</SubscriptionContext.Provider>
  )
}

export function useSubscription() {
  const { loading, selectedList, setSelectedList, requestSubscriptions } = useContext(SubscriptionContext)

  const updateSelected = useCallback(
    (categoryId: SelectedType['categoryId'], data: Partial<SelectedType>) => {
      setSelectedList(old => old.map(o => (o.categoryId === categoryId ? { ...o, ...data } : o)))
    },
    [setSelectedList]
  )

  return { loading, selectedList, setSelectedList, updateSelected, requestSubscriptions }
}
