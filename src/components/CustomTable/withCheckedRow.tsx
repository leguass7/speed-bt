import React, { useCallback, useEffect, useState } from 'react'

export type CheckItemProps = Record<any, any> & {
  onClick?: (_id: number) => void
}
interface Selected {
  id: number
  selected?: boolean
}

export interface CheckRowProps {
  list?: CheckItemProps[]
  onChange?: (_idSelected: number[]) => void
  multiple?: boolean
  defaultSelected?: number[]
}

function findId(list?: Selected[], id?: number): Selected | null {
  return list ? list.find(l => l && id && l.id === id) || null : null
}

function normalizeList(list: any[] = [], defaultSelected: number[] = []): Selected[] {
  const nList = list
    .map(l => {
      if (l && l.id) {
        const selected = !!l.selected || defaultSelected.includes(l.id)
        return { id: l.id, selected }
      }
      return null
    })
    .filter(l => !!l)

  for (let i = 0; i < defaultSelected.length; i++) {
    const newId = defaultSelected[i]
    if (!nList.find(f => f && f.id === newId)) {
      nList.push({ id: newId, selected: true })
    }
  }

  return nList as Selected[]
}

/** HOC */
export function withCheckedRow(Component: React.FC<CheckItemProps>) {
  const CheckRow = ({ list, multiple, onChange, defaultSelected = [] }: CheckRowProps) => {
    const [selected, setSelected] = useState<Selected[]>(normalizeList(list, defaultSelected))

    const [toEmit, setToEmit] = useState(false)

    const handleItemClick: CheckItemProps['onClick'] = useCallback(
      id => {
        const filter = (lst: Selected[]) => {
          const found = findId(lst, id)
          const clicked = found || { id, selected: false }
          const newList = found ? lst : [...lst, clicked]
          if (multiple) {
            return newList.map(l => (l.id === id ? { ...l, selected: !l.selected } : l))
          }
          return newList.map(l => ({ ...l, selected: l.id === id ? !clicked.selected : false }))
        }

        setSelected(filter)
        if (onChange) setToEmit(true)
      },
      [multiple, onChange]
    )

    const emitChange = useCallback(() => {
      if (onChange && typeof onChange === 'function') {
        onChange(selected.filter(l => !!l.selected).map(l => l.id))
      }
      setToEmit(false)
    }, [onChange, selected])

    useEffect(() => {
      if (toEmit) emitChange()
    }, [toEmit, emitChange])

    return (
      <>
        {list &&
          list.map((item, i) => {
            const found = findId(selected, item.id)
            return (
              <Component
                id={item.id}
                key={`${i}-${item && item.id}`}
                record={item}
                selected={!!(found && found.selected)}
                onClick={handleItemClick}
              />
            )
          })}
      </>
    )
  }

  return CheckRow
}
