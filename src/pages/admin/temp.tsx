import { useCallback, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import type { NextPage } from 'next'

import { TempSubscriptions } from '~/components/admin/TempSubscriptions'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { getAdminSubscriptions, IResponseSubscriptions } from '~/service/api/admin'

const AdminTempPage: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IResponseSubscriptions['subscriptions']>([])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await getAdminSubscriptions()
    if (response?.success) {
      setData(response?.subscriptions || [])
    } else {
      toast.error(response?.message || 'Erro')
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])
  return (
    <Layout admin>
      <PageTitle title="Página temporária para inscrições" weight="normal" horizontalPad={10} />
      <TempSubscriptions subscriptions={data} loading={loading} updateListHandler={fetchData} />
    </Layout>
  )
}

export default AdminTempPage
