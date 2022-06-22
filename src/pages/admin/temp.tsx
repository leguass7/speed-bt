import { useCallback, useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { Box, FormControl, InputLabel, MenuItem, Modal } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import type { NextPage } from 'next'

import { Subscriptions } from '~/components/admin/Subscriptions'
import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { PixCode } from '~/components/PixCode'
import { FlexContainer } from '~/components/styled'
import { ModalPixContainer } from '~/components/subscription/SaveSubscription/styles'
import { IResponseSubscriptionStore } from '~/server-side/subscription'
import { AdminSubscriptionsParams, getAdminSubscriptions, IResponseSubscriptions } from '~/service/api/admin'
import { checkPayment } from '~/service/api/payment'

const cats = [
  { index: 1, gender: undefined, categoryId: 1, label: 'Infantil' },
  { index: 2, gender: 'M', categoryId: 2, label: 'Iniciante' },
  { index: 3, gender: 'F', categoryId: 2, label: 'Iniciante' },
  { index: 4, gender: 'M', categoryId: 3, label: 'Intermadiário' },
  { index: 5, gender: 'F', categoryId: 3, label: 'Intermadiário' },
  { index: 6, gender: 'M', categoryId: 4, label: 'Open' },
  { index: 7, gender: 'F', categoryId: 4, label: 'Open' },
  { index: 8, gender: 'M', categoryId: 5, label: '50+' },
  { index: 9, gender: 'F', categoryId: 5, label: '50+' }
] as const

const AdminTempPage: NextPage = () => {
  const { theme } = useAppTheme()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<IResponseSubscriptions['subscriptions']>([])
  const [age, setAge] = useState('1')
  const [filter, setFilter] = useState<AdminSubscriptionsParams>({ categoryId: 1 })
  const [modalOpen, setModalOpen] = useState(false)
  const [qrcode, setQrcode] = useState<IResponseSubscriptionStore>(null)

  const handleChange = (event: SelectChangeEvent) => {
    const v = Number(event?.target?.value) || null
    setAge(v ? `${v}` : '')
    const found = cats.find(f => f.index === v)
    setFilter(found ? { categoryId: found.categoryId, gender: found?.gender || '' } : {})
  }

  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await getAdminSubscriptions({ ...filter })
    if (response?.success) {
      setData(response?.subscriptions || [])
    } else {
      toast.error(response?.message || 'Erro')
    }
    setLoading(false)
  }, [filter])

  const fetchPixCode = useCallback(async (paymentId: number) => {
    setLoading(true)
    const response = await checkPayment(paymentId)
    const { success, message, paid, imageQrcode, qrcode } = response
    if (success) {
      if (!paid && (imageQrcode || qrcode)) {
        setQrcode({ imageQrcode, paymentId, qrcode, txid: '' })
        setModalOpen(true)
      }
    } else {
      toast.error(message || 'Erro ao verificar pagamento')
    }
    setLoading(false)
  }, [])

  const onReceivedPay = useCallback(
    (paid: boolean) => {
      if (!!paid) fetchData()
    },
    [fetchData]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleModalClose = (_event: any, _reason: 'backdropClick' | 'escapeKeyDown') => {
    setModalOpen(false)
  }

  return (
    <Layout admin>
      <PageTitle title="Página temporária para inscrições" weight="normal" horizontalPad={10} />
      <FlexContainer verticalPad={8} horizontalPad={10}>
        <div style={{ width: 240 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Categoria" onChange={handleChange}>
              {cats.map(cat => {
                return (
                  <MenuItem key={`cat-${cat.index}`} value={cat.index}>
                    {cat.label} {cat?.gender ? `(${cat.gender})` : ``}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
        </div>
      </FlexContainer>

      <Subscriptions subscriptions={data} loading={loading} updateListHandler={fetchData} onClickPix={fetchPixCode} />
      <Modal open={modalOpen} onClose={handleModalClose}>
        <ModalPixContainer>
          <Box padding={2} sx={{ backgroundColor: theme.colors.background, borderRadius: 1 }}>
            <PixCode
              base64QRCode={qrcode?.imageQrcode}
              stringQRCode={qrcode?.qrcode}
              onClose={() => setModalOpen(false)}
              paymentId={qrcode?.paymentId}
              txid={qrcode?.txid}
              onReceivedPay={onReceivedPay}
            />
          </Box>
        </ModalPixContainer>
      </Modal>
    </Layout>
  )
}

export default AdminTempPage
