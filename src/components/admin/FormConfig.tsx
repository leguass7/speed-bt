import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { Form } from '@unform/web'

import { getAdminConfig, saveAdminConfig } from '~/service/api/admin-config'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { InputText } from '../forms/InputText'
import { Title } from '../styled'

type FormData = {
  clientId: string
  clientSecret: string
}
type Props = {
  onCancel?: () => void
}
export const FormConfig: React.FC<Props> = ({ onCancel }) => {
  const { theme } = useAppTheme()
  const [data, setData] = useState<FormData>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(async (formData: FormData) => {
    setLoading(true)
    const response = await saveAdminConfig(formData)
    if (response?.success) {
      toast.success('Configurações salvas')
    } else {
      toast.error('Erroao salvar')
    }
    setLoading(false)
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await getAdminConfig()
    if (response?.success) {
      setData(response?.data)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data}>
        <Title verticalPad={theme.spacing.l}>Gerencianet</Title>
        <InputText name="clientId" label="clientId" />
        <InputText name="clientSecret" label="clientSecret" />

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <InputText name="dev.clientId" label="clientId (DEV)" />
        <InputText name="dev.clientSecret" label="clientSecret (DEV)" />

        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        <Stack direction={'row'} justifyContent="center" spacing={1} sx={{ marginTop: 3 }}>
          {onCancel ? (
            <Button type="button" disabled={loading} variant="outlined" onClick={onCancel}>
              VOLTAR
            </Button>
          ) : null}
          <Button type="submit" disabled={loading} variant="contained">
            {loading ? <CircularProgress size={24} /> : 'SALVAR'}
          </Button>
        </Stack>
      </Form>
    </>
  )
}
