import React, { createContext, useContext, useState } from 'react'

export interface ISubscriptionContext {
  loading?: boolean
  selectedList?: SelectedType[]
  setSelectedList?: React.Dispatch<React.SetStateAction<SelectedType[]>>
}

export const SubscriptionContext = createContext({} as ISubscriptionContext)

export type SelectedType = {
  id: number
  selected?: boolean
}

type ProviderProps = {
  children: React.ReactNode
}
export const SubscriptionProvider: React.FC<ProviderProps> = ({ children }) => {
  const [loading] = useState<ISubscriptionContext['loading']>(false)
  const [selectedList, setSelectedList] = React.useState<SelectedType[]>([])

  return <SubscriptionContext.Provider value={{ loading, selectedList, setSelectedList }}>{children}</SubscriptionContext.Provider>
}

export function useSubscription() {
  const context = useContext(SubscriptionContext)

  return context
}
