import React, { useCallback, useMemo } from 'react'

import type { ICategory } from '~/server-side/category/category.dto'

import { useSubscription } from '../SubscriptionProvider'
import { SelectItem } from './SelectItem'
import { ItemsList } from './styles'

const rules = [
  [1, 2], // infantil / iniciante
  [2, 4], // iniciante / Open
  [2, 5], // iniciante / 50+
  [3, 4], // intermediária / Open
  [3, 5], // intermediária / 50+
  [5, 4], // intermediária / Open
  [6, 1] // teste
]

function filter(ids: number[]): number[][] {
  return ids.reduce((acc, id) => {
    rules.forEach(rule => {
      if (rule.includes(id)) {
        acc.push(rule)
      }
    })
    return acc
  }, [])
}

function reduce(ids: number[][]): number[] {
  return ids.reduce((acc, n) => {
    n.forEach(i => {
      if (!acc.includes(i)) acc.push(i)
    })
    return acc
  }, [])
}

function getAllowed(ids: number[]): number[] {
  if (ids?.length) {
    const filtered = filter(ids)
    return reduce(filtered)
  }
  return reduce(rules)
}

export type Props = {
  categories?: ICategory[]
}
export const SelectSubscriptionCategory: React.FC<Props> = ({ categories = [] }) => {
  const { selectedList, setSelectedList } = useSubscription()

  const handleToogleSelect = useCallback(
    (categoryId: number, checked: boolean) => {
      setSelectedList(old => {
        const selected = !!checked
        const found = old.find(f => f.categoryId === categoryId)
        if (found)
          return old.map(f => {
            return f.categoryId === categoryId ? { ...f, selected } : f
          })
        return [...old, { categoryId, selected }].sort()
      })
    },
    [setSelectedList]
  )

  const enabledList = useMemo(() => {
    const selIds = selectedList.filter(f => f.selected).map(f => f.categoryId)
    if (selIds?.length >= 2) return selIds
    return getAllowed(selIds)
  }, [selectedList])

  return (
    <>
      <ItemsList>
        {categories.map(category => {
          const checked = selectedList.find(f => f.categoryId === category.id && !!f?.selected)
          const disabled = !enabledList.includes(category.id) || !!checked?.id
          return (
            <SelectItem
              key={`cat-${category.id}`}
              {...category}
              selected={!!checked}
              onSelect={handleToogleSelect}
              disabled={!!disabled}
              highlight={!!checked?.id}
            />
          )
        })}
      </ItemsList>
    </>
  )
}
