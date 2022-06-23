import React, { createContext } from 'react'

import { GenericObject, IColumnTable, Order } from './types'

interface Pagination {
  page?: number
  size?: number
  orderby?: string
  order?: string
}
interface IContext {
  columns: IColumnTable<GenericObject>[]
  order: Order
  setOrder: React.Dispatch<React.SetStateAction<Order>>
  filter: any
  setFilter: React.Dispatch<React.SetStateAction<any>>
  clearFilter: () => void
  emitFetch: () => void
  pagination: Pagination
}

const CustomTableContext = createContext<IContext>({} as IContext)

export default CustomTableContext
