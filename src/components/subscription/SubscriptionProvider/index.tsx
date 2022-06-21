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

export type SelectedType = Omit<IRequestStoreSubscription, 'id'> & { readonly id?: number; createdAt: Date | String }

function subscriptionDto(data: ResultSubscription): SelectedType {
  const { id, paid, category, partner, categoryId, value, paymentId, user, merged, partnerId, createdAt } = data
  const result: SelectedType = {
    id,
    paid,
    selected: true,
    categoryId: categoryId || category?.id,
    category: { id: category?.id, title: category?.title },
    partnerId,
    partner: { ...partner },
    user: { ...user },
    value,
    paymentId,
    merged: !!merged,
    createdAt
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
    if (response?.success) {
      const subs = (response?.subscriptions || []).map(subscriptionDto)
      setSelectedList(subs)
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
