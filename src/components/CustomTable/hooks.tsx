import React, { useCallback, useContext, useMemo } from 'react'

import CustomTableContext from './CustomTableContext'

export default function useCustomTable() {
  const context = useContext(CustomTableContext)
  return context
}

export function useCustomTableFilter<T extends Record<string, any>>() {
  const { setFilter, clearFilter, emitFetch, filter: localFilter, pagination } = useContext(CustomTableContext)
  // const configFilter: React.Dispatch<React.SetStateAction<T>> = useCallback(filter => setFilter(filter), [setFilter])

  const configFilter: React.Dispatch<React.SetStateAction<T>> = useCallback(setFilter, [setFilter])

  const updateFilter: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (data: T) => {
      setFilter(old => ({ ...old, ...data }))
    },
    [setFilter]
  )

  const hasFilter = useMemo(() => {
    const keys = Object.values(localFilter)?.filter(f => !!f)?.length
    return !!keys
  }, [localFilter])

  return { setFilter: configFilter, clearFilter, emitFetch, filter: localFilter as T, hasFilter, updateFilter, pagination }
}
