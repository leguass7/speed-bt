import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Stack } from '@mui/material'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { string, object } from 'yup'

import { InputText } from '~/components/forms/InputText'
import { validateFormData } from '~/helpers/validation'
import type { IRequestManualPayment } from '~/server-side/payment/payment.dto'
import { adminManualPayment } from '~/service/api/admin'

type Props = {
  paymentId?: number
  onCancel?: () => void
  onSuccess?: () => void
}
export const FormManualPaid: React.FC<Props> = ({ paymentId, onCancel, onSuccess }) => {
  const formRef = useRef<FormHandles>(null)
  const [saving, setSaving] = useState(false)

  const formSchema = object().shape({
    e2eId: string().required('Informe o ID Pix')
  })

  const handleSubmit = async (formData: IRequestManualPayment) => {
    const invalid = await validateFormData(formSchema, { ...formData }, formRef.current)
    if (!invalid) {
      setSaving(true)
      const response = await adminManualPayment(paymentId, formData)

      if (response?.success) {
        if (response?.paid) toast.success('Pagamento realizado')
        if (onSuccess) onSuccess()
      } else {
        toast.error(response?.message || 'Erro na consulta')
      }
    } else {
      Object.entries(invalid).forEach(([, message]) => {
        toast.error(message)
      })
    }
    setSaving(false)
  }

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <InputText name="e2eId" label="Identificação do PIX" />
      <Stack direction={'row'} justifyContent="center" spacing={1} sx={{ marginTop: 3 }}>
        {onCancel ? (
          <Button type="button" disabled={saving} variant="outlined" onClick={onCancel}>
            VOLTAR
          </Button>
        ) : null}
        <Button type="submit" disabled={saving} variant="contained">
          SALVAR
        </Button>
      </Stack>
    </Form>
  )
}
