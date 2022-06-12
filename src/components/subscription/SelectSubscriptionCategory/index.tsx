import React, { useCallback } from 'react'

import type { ICategory } from '~/server-side/category/category.dto'

import { useSubscription } from '../SubscriptionProvider'
import { SelectItem } from './SelectItem'
import { ItemsList } from './styles'

export type Props = {
  categories: ICategory[]
}
export const SelectSubscriptionCategory: React.FC<Props> = ({ categories }) => {
  const { selectedList, setSelectedList } = useSubscription()

  const handleToogleSelect = useCallback(
    (id: number, checked: boolean) => {
      setSelectedList(old => {
        const selected = !!checked
        const found = old.find(f => f.id === id)
        if (found)
          return old.map(f => {
            return f.id === id ? { ...f, selected } : f
          })
        return [...old, { id, selected }].sort()
      })
    },
    [setSelectedList]
  )

  return (
    <>
      <ItemsList>
        {categories.map(category => {
          const checked = !!selectedList.find(f => f.id === category.id && !!f?.selected)
          return <SelectItem key={`cat-${category.id}`} {...category} selected={checked} onSelect={handleToogleSelect} />
        })}
      </ItemsList>
    </>
  )
}
