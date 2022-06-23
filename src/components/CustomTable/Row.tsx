import React, { useContext, memo, useCallback, useMemo } from 'react'

import { TableRow, TableCell } from '@mui/material'
import cx from 'classnames'

import CustomTableContext from './CustomTableContext'
import { GenericObject, ICustomCellProps } from './types'
import { CheckItemProps } from './withCheckedRow'

export interface CustomRowProps extends CheckItemProps {
  record: Record<string, any>
}

const CustomRow: React.FC<CustomRowProps> = ({ record, onClick, selected }) => {
  const { columns } = useContext(CustomTableContext)

  const handleRowClick = useCallback(() => {
    if (onClick && typeof onClick === 'function') onClick(record.id)
  }, [onClick, record])

  const renderCell = useCallback(
    (columnName: string | number, Cell?: React.FC<ICustomCellProps<GenericObject>>, CellProps: GenericObject = {}) => {
      if (Cell) return <Cell record={record} columnName={columnName} {...CellProps} />
      return <>{record[columnName]}</>
    },
    [record]
  )

  const classes = useMemo(() => {
    return cx({
      selected: !!selected,
      selectable: !!onClick
    })
  }, [selected, onClick])

  return (
    <TableRow onClick={handleRowClick} className={classes}>
      {columns.map(({ name, Cell, align = 'left', width, CellProps }, i) => {
        const key = `${name}-${i}-${(record && record.id) || '0'}`
        return (
          <TableCell key={key} align={align} width={width}>
            {renderCell(`${name}`, Cell, CellProps)}
          </TableCell>
        )
      })}
    </TableRow>
  )
}

export default memo(CustomRow) as typeof CustomRow
