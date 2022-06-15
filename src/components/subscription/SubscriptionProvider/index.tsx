import React, { createContext, useCallback, useContext, useState } from 'react'

import type { IRequestStoreSubscription } from '~/server-side/subscription'

export interface ISubscriptionContext {
  loading?: boolean
  selectedList?: SelectedType[]
  setSelectedList?: React.Dispatch<React.SetStateAction<SelectedType[]>>
}

export const SubscriptionContext = createContext({} as ISubscriptionContext)

export type SelectedType = IRequestStoreSubscription

type ProviderProps = {
  children: React.ReactNode
}
export const SubscriptionProvider: React.FC<ProviderProps> = ({ children }) => {
  const [loading] = useState<ISubscriptionContext['loading']>(false)
  const [selectedList, setSelectedList] = React.useState<SelectedType[]>([])

  return <SubscriptionContext.Provider value={{ loading, selectedList, setSelectedList }}>{children}</SubscriptionContext.Provider>
}

export function useSubscription() {
  const { loading, selectedList, setSelectedList } = useContext(SubscriptionContext)

  const updateSelected = useCallback(
    (id: SelectedType['id'], data: Partial<SelectedType>) => {
      setSelectedList(old => old.map(o => (o.id === id ? { ...o, ...data } : o)))
    },
    [setSelectedList]
  )

  return { loading, selectedList, setSelectedList, updateSelected }
}
