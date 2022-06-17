import React, { useRef, useState } from 'react'
import { toast } from 'react-toastify'

import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Stack from '@mui/material/Stack'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { object, string } from 'yup'

import { InputMask } from '~/components/forms/InputText'
import { FlexContainer, Paragraph } from '~/components/styled'
import { useUserAuth } from '~/components/UserProvider'
import { validateFormData } from '~/helpers/validation'
import type { IResponseUserStore, IUser } from '~/server-side/users'
import { saveUser } from '~/service/api/user'

type FormData = Pick<IUser, 'cpf'>
export type FromCPFProps = {
  onCancel?: () => void
  onSuccess?: (data?: FormData, response?: IResponseUserStore) => void
}
export const FormCPF: React.FC<FromCPFProps> = ({ onCancel, onSuccess }) => {
  const formRef = useRef<FormHandles>(null)
  const { userData } = useUserAuth()
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (formData: FormData) => {
    const invalid = await validateFormData(formSchema, { ...formData }, formRef.current)
    if (!invalid) {
      setSaving(true)
      const response = await saveUser(formData)
      if (response?.success) {
        toast.success('CPF salvo com sucesso!')
        if (onSuccess) onSuccess(formData, response)
      } else {
        toast.error(response?.message || 'Erro ao salvar')
      }
      setSaving(false)
    } else {
      toast.error(invalid?.cpf || 'Erro ao salvar')
    }
    //
  }
  return (
    <Fade in={true}>
      <div>
        <FlexContainer justify="center" align="center" verticalPad={10}>
          <Paragraph align="center" width={'240px'}>
            Precisamos do seu CPF para gerar o PIX de pagamento.
          </Paragraph>
        </FlexContainer>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={userData}>
          <InputMask name="cpf" label="CPF" mask={'999.999.999-99'} alwaysShowMask={false} />
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
      </div>
    </Fade>
  )
}

const formSchema = object().shape({
  cpf: string().required('CPF é requirido')
})
