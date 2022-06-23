import React, { useCallback, useState } from 'react'

import type { User } from '@prisma/client'

import { CircleLoading } from '~/components/CircleLoading'
import { CustomTable } from '~/components/CustomTable'
import type { QueryPagination } from '~/server-side/api.interface'
import { adminPaginateUsers } from '~/service/api/admin'

import { columns } from './columns'
import { Filter } from './Filter'

const pageSize = 24

export const TableUsers: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [records, setRecords] = useState<Partial<User>[]>([])
  const [total, setTotal] = useState(0)

  const fetchData = useCallback(async (pagination?: QueryPagination) => {
    setLoading(true)
    const result = await adminPaginateUsers({ ...pagination })
    if (result?.success) {
      setRecords(result.data)
      setTotal(result?.total || 0)
    }
    setLoading(false)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <CustomTable columns={columns} pageSize={pageSize} total={total} records={records} onPagination={fetchData}>
        <Filter />
      </CustomTable>
      {loading ? <CircleLoading /> : null}
    </div>
  )
}
