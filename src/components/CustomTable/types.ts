import React from 'react'

// export interface IColumnTable {
//   name: string
//   label: string
//   Cell?: React.FC<ICustomCellProps & {}>
// }

export type Order = [string, 'asc' | 'desc']

export type Rows = Record<string, any>[]

// export interface ICustomCellProps {
//   record: any
//   columnName: string
// }

export interface ICustomCellProps<A> {
  record: A
  columnName: keyof A
}

export interface GenericObject {
  [x: string]: any
}

export interface IColumnTable<T = unknown> {
  name?: keyof T
  label?: string
  width?: string | number
  align?: 'center' | 'left' | 'right'
  unsortable?: boolean
  Cell?: React.FC<ICustomCellProps<T> & Record<string, any>>
  CellProps?: GenericObject
  size?: 'small' | 'medium'
  className?: string
  isCurrency?: boolean
}

export interface TableFetchParams {
  fetchId?: number
  page?: number
  orderby?: string
  order?: 'asc' | 'desc'
}

export interface TableFetcher {
  (_params: TableFetchParams): void
}
