import React, { useEffect } from 'react'

import { CircleLoading } from '../CircleLoading'
import { useSubscription } from './SubscriptionProvider'

type Props = {
  children?: React.ReactNode
}
export const SubscriptionLoader: React.FC<Props> = ({ children }) => {
  const { loading, requestSubscriptions } = useSubscription()

  useEffect(() => {
    requestSubscriptions()
  }, [requestSubscriptions])

  return (
    <>
      {children}
      {loading ? <CircleLoading /> : null}
    </>
  )
}
