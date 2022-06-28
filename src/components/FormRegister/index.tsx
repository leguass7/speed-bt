import React, { useCallback, useMemo, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { sub } from 'date-fns'
import { object, ref, string } from 'yup'

import { CircleLoading } from '~/components/CircleLoading'
import { InputDate } from '~/components/forms/InputDate'
import { InputSelects } from '~/components/forms/InputSelects'
import { InputMask, InputText } from '~/components/forms/InputText'
import { RegisterSuccess } from '~/components/PreRegistration/RegisterSuccess'
import { useUserAuth } from '~/components/UserProvider'
import { genders, shirtSizes } from '~/config/constants'
import { validateFormData } from '~/helpers/validation'
import type { IUser } from '~/server-side/users'
import { createUser, saveUser } from '~/service/api/user'

import { Container } from './styles'

type FormData = IUser & { confirmPassword: string }

type FormRegisterProps = {
  onCancel?: () => void
}

export const FormRegister: React.FC<FormRegisterProps> = ({ onCancel }) => {
  const { loading: loadingUser, userData, updateUserData, requestMe, authenticated } = useUserAuth()

  const [saving, setSaving] = useState(false)
  const [created, setCreated] = useState('')

  const formRef = useRef<FormHandles>(null)

  const formSchema = useMemo(
    () =>
      object().shape({
        name: string().required('seu nome é requerido'),
        email: string().required('e-mail é requirido'),
        phone: string().required('telefone é requirido'),
        birday: string().required('data de nascimento é requirido'),
        password: authenticated ? string() : string().required('A senha é requerido'),
        confirmPassword: string().oneOf([ref('password'), null], 'Senha e confirmar senha não batem'),
        shirtSize: string().required('Tamanho da camisa é requirido')
        // category: string().required('Categoria é requirido'),
        // gender: string().required('gênero é requirido'),
        // cpf: string().required('CPF é requirido')
      }),
    [authenticated]
  )

  const handleSubmit = useCallback(
    async (formData: FormData) => {
      const invalid = await validateFormData(formSchema, { ...formData }, formRef.current)
      if (!invalid) {
        setSaving(true)
        if (formData?.confirmPassword) delete formData.confirmPassword

        const save = authenticated && userData?.id ? saveUser : createUser
        const response = await save(formData)

        if (!response || !response?.success) {
          toast.error(response?.message || 'Erro ao salvar')
        } else {
          if (response.createdId) {
            setCreated(response.createdId)
          } else {
            updateUserData({ completed: !!response?.completed })
            requestMe()
            setCreated('')
          }
          toast.success('Informações gravadas')
        }
        setSaving(false)
      } else {
        Object.entries(invalid).forEach(([, message]) => {
          toast.error(message)
        })
      }
    },
    [userData, updateUserData, requestMe, authenticated, formSchema]
  )

  return (
    <Container>
      {loadingUser ? (
        <CircleLoading />
      ) : (
        <>
          {created ? (
            <RegisterSuccess />
          ) : (
            <Form ref={formRef} onSubmit={handleSubmit} initialData={userData}>
              <InputText name="name" label="Nome" placeholder="seu nome" />
              <InputText name="email" label="e-mail" placeholder="seu e-mail" />
              <InputText type="password" name="password" label="senha" placeholder="escolha uma senha" />
              <InputText type="password" name="confirmPassword" label="Confirmar senha" placeholder="confirmação da senha" />
              <InputMask name="cpf" label="CPF" mask={'999.999.999-99'} alwaysShowMask={false} />
              <InputMask name="phone" label="Telefone" mask={'(99) 9 9999-9999'} alwaysShowMask={false} />
              <InputDate name="birday" label="Nascimento" maxDate={sub(new Date(), { years: 5 })} minDate={sub(new Date(), { years: 75 })} />
              {/* <InputSelects name="category" label="Categoria" options={categories} defaultSelected={userData?.category || 'C'} /> */}
              <InputSelects name="shirtSize" label="Tamanho da camisa" options={shirtSizes} defaultSelected={userData?.shirtSize || 'M'} />
              <InputSelects name="gender" label="Gênero" options={genders} defaultSelected={userData?.gender || 'M'} />
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
          )}
        </>
      )}
    </Container>
  )
}
