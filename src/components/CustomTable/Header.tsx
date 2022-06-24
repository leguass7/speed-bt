import React, { useContext, useCallback, useMemo } from 'react'

import { TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import styled from 'styled-components'

import CustomTableContext from './CustomTableContext'
import { GenericObject, IColumnTable, Order } from './types'

const CurrencyLabel = styled.span`
  word-break: keep-all;
  white-space: nowrap;
`
interface SortProps {
  columnName: string
  label?: string
  isCurrency?: boolean
}

const SortLabel: React.FC<SortProps> = ({ columnName, label, isCurrency }) => {
  const { order, setOrder } = useContext(CustomTableContext)
  const active = useMemo(() => !!(columnName === order[0]), [columnName, order])

  const handleOrder = useCallback(() => {
    const newOrder = [columnName]
    if (order[0] === columnName) newOrder.push(order[1] === 'asc' ? 'desc' : 'asc')
    else newOrder.push('asc')
    setOrder(newOrder as Order)
  }, [order, setOrder, columnName])

  return (
    <TableSortLabel active={active} direction={active ? order[1] : undefined} onClick={handleOrder}>
      {isCurrency ? <CurrencyLabel>{label}</CurrencyLabel> : label}
    </TableSortLabel>
  )
}

interface HeaderProps {
  columns: IColumnTable<GenericObject>[]
}

const Header: React.FC<HeaderProps> = ({ columns }) => {
  const renderLabel = (label: string, isCurrency: boolean) => {
    return isCurrency ? <CurrencyLabel>{label}</CurrencyLabel> : label
  }
  return (
    <TableHead>
      <TableRow>
        {columns.map(({ name, label, width, unsortable, align = 'left', size = 'small', className, isCurrency }, i) => {
          const disabledSort = !name ? true : !!unsortable
          return (
            <TableCell key={`th-${name}-${i}`} width={width} align={align} size={size} className={className}>
              {disabledSort ? renderLabel(label, isCurrency) : <SortLabel columnName={String(name)} label={label} isCurrency={isCurrency} />}
            </TableCell>
          )
        })}
      </TableRow>
    </TableHead>
  )
}

export default Header
