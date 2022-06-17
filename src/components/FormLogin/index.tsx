import { useCallback, useRef } from 'react'

import { Form } from '@unform/web'
import { signIn } from 'next-auth/react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { ButtonGoogle } from '~/components/ButtonTheme/ButtonGoogle'
import { validateFormData } from '~/helpers/validation'

import { ButtonTheme } from '../ButtonTheme'
import { CircleLoading } from '../CircleLoading'
import { InputText } from '../forms/InputText'
import { useUserAuth } from '../UserProvider'

interface Props {
  csrfToken?: string
}

interface IFormData {
  email: string
  password: string
}

const schema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório'),
  password: Yup.string().required('A senha é obrigatória')
})

export const FormLogin: React.FC<Props> = ({}) => {
  const { loading } = useUserAuth()

  const formRef = useRef(null)

  const onSubmit = useCallback(async (data: IFormData) => {
    const invalid = await validateFormData(schema, data, formRef.current)
    if (invalid) return null

    const { email, password } = data
    await signIn('custom', { email, password })
  }, [])

  return (
    <Container>
      <Form onSubmit={onSubmit} ref={formRef}>
        <InputText label="E-mail" name="email" />
        <InputText type="password" label="Senha" name="password" />
        <ButtonContainer>
          <ButtonTheme type="submit">Enviar</ButtonTheme>
          <ButtonGoogle type="button" />
        </ButtonContainer>
      </Form>
      {loading ? <CircleLoading /> : null}
    </Container>
  )
}

const Container = styled.div`
  max-width: 100%;
  margin-top: 12px;
`

const ButtonContainer = styled.div`
  display: flex;
  padding: 4px;

  button {
    margin: 0 2px;
  }
`
