import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'

import { Table, TableBody, TableProps, Pagination } from '@mui/material'
import styled from 'styled-components'

import CustomTableContext from './CustomTableContext'
import Header from './Header'
import Row from './Row'
import { GenericObject, IColumnTable, Order, Rows, TableFetcher } from './types'
import { withCheckedRow } from './withCheckedRow'

const RowList = withCheckedRow(Row)

const NothingText = styled.p`
  text-align: center;
  margin: 0 auto;
  display: block;
  padding: 10px;
`

const TableContainer = styled.div`
  margin: 0 auto;
  overflow-x: auto;
  width: auto;
  max-width: 100%;

  table tr th,
  table tr th.MuiTableCell-root {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
    .Mui-active {
      color: ${({ theme }) => theme.colors.secondary};
    }
  }

  table tr.selected {
    background-color: rgba(0, 0, 0, 0.2);
  }

  table tr.selectable {
    cursor: pointer;
  }

  table th.MuiTableCell-sizeSmall {
    /* font-size: 12px; */
  }

  table th.xsmall,
  td.xsmall {
    font-size: 10px;
  }

  table th.small,
  td.small {
    font-size: 12px;
  }
`
const SpanTotal = styled.span`
  font-size: 14px;
`

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.l}px;
`

interface CustomTableProps extends TableProps {
  columns?: IColumnTable<GenericObject>[] | any[]
  total?: number
  records?: Rows
  pageSize?: number
  selectPages?: number[]
  onPagination?: TableFetcher
  onRowSelect?: (_ids: number[]) => void
  tableSize?: 'small' | 'medium'
  multiple?: boolean
  defaultSelected?: number[]
}

const CustomTable: React.FC<CustomTableProps> = ({
  children,
  tableSize = 'small',
  columns = [],
  records,
  pageSize = 30,
  total = 0,
  onPagination,
  onRowSelect,
  multiple,
  defaultSelected
}) => {
  const [fixedColumns] = useState(columns)
  const refCount = useRef(0)
  const [page, setPage] = useState(1)
  const [order, setOrder] = useState<Order>(['id', 'desc'])
  const [filter, setFilter] = useState<any>({})

  const paginationCount = useMemo(() => {
    return total && total > 0 ? Math.ceil(total / pageSize) : 1
  }, [total, pageSize])

  const emitFetch = useCallback(() => {
    if (onPagination && typeof onPagination === 'function') {
      onPagination({
        fetchId: refCount.current,
        page,
        size: pageSize,
        orderby: order[0],
        order: order[1],
        ...filter
      })
    }
  }, [onPagination, refCount, order, page, filter, pageSize])

  const handlePageChange = useCallback((_e, p) => {
    setPage(p)
  }, [])

  const handleClearFilter = useCallback(() => setFilter({}), [])

  useEffect(() => {
    emitFetch()
    refCount.current += 1
  }, [emitFetch])

  const renderRecords = useCallback(
    (list: any = []) => {
      if (onRowSelect && typeof onRowSelect === 'function') {
        return <RowList list={list} multiple={!!multiple} onChange={onRowSelect} defaultSelected={defaultSelected} />
      }
      return (
        <>
          {list.map((record: any, r: number) => {
            const key = `row-${record?.id || r}`
            return <Row key={key} record={record} />
          })}
        </>
      )
    },
    [onRowSelect, multiple, defaultSelected]
  )

  const pagination = useMemo(() => {
    return { page, size: pageSize, orderby: order[0], order: order[1] }
  }, [order, pageSize, page])

  return (
    <CustomTableContext.Provider
      value={{
        columns: fixedColumns,
        order,
        setOrder,
        filter,
        setFilter,
        clearFilter: handleClearFilter,
        emitFetch,
        pagination
      }}
    >
      {children}
      <TableContainer>
        <Table size={tableSize}>
          <Header columns={fixedColumns} />
          <TableBody>{records && records.length ? renderRecords(records) : null}</TableBody>
        </Table>
        {records && records.length === 0 && <NothingText>Nenhum registro</NothingText>}
        {total ? (
          <PaginationContainer>
            <div>
              <SpanTotal>
                Total: <strong>{total}</strong>
              </SpanTotal>
            </div>
            <div>
              <Pagination count={paginationCount} shape="rounded" onChange={handlePageChange} color="primary" />
            </div>
            <div></div>
          </PaginationContainer>
        ) : null}
      </TableContainer>
    </CustomTableContext.Provider>
  )
}

export default CustomTable
