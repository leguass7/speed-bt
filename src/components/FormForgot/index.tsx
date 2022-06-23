import { useCallback, useRef, useState } from 'react'
import { toast } from 'react-toastify'

import CheckIcon from '@mui/icons-material/Check'
import { Form } from '@unform/web'
import Link from 'next/link'
import styled from 'styled-components'
import * as Yup from 'yup'

import { validateFormData } from '~/helpers/validation'
import { forgotPass } from '~/service/api/user'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { ButtonTheme } from '../ButtonTheme'
import { CircleLoading } from '../CircleLoading'
import { InputText } from '../forms/InputText'
import { Paragraph, Title } from '../styled'
import { useUserAuth } from '../UserProvider'

interface IFormData {
  email: string
}

const schema = Yup.object({
  email: Yup.string().email('E-mail inválido').required('O e-mail é obrigatório')
})

export const FormForgot: React.FC = () => {
  const { theme } = useAppTheme()
  const { loading } = useUserAuth()
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)

  const formRef = useRef(null)

  const onSubmit = useCallback(async (data: IFormData) => {
    const invalid = await validateFormData(schema, data, formRef.current)
    if (!invalid) {
      setSending(true)
      const { email } = data
      const response = await forgotPass(email)
      if (response?.success) {
        setSuccess(true)
      } else {
        toast.error(response?.message || 'Erro ao enviar recuparação de senha')
      }
      setSending(false)
    }
  }, [])

  return (
    <Container>
      {success ? (
        <>
          <br />
          <Title textColor={theme.colors.primary} verticalPad={20}>
            <CheckIcon /> E-mail enviado com sucesso!
          </Title>

          <Paragraph verticalSpaced horizontalSpaced textColor="#fff">
            Você receberá um e-mail de <strong>lesbr3@gmail.com</strong> com instruções.
          </Paragraph>
          <Paragraph verticalSpaced horizontalSpaced textColor="#fff">
            Por favor verifique a caixa de entrada do seu e-mail, e também o lixo eletrônico.
            <br />
            <br />
            <Link href={'/login'}>Voltar para login</Link>
          </Paragraph>
        </>
      ) : (
        <>
          <Paragraph verticalSpaced horizontalSpaced>
            Informe o endereço de e-mail utilizado no cadastro, em breve você receberá um e-mail com instruções.
          </Paragraph>
          <Form onSubmit={onSubmit} ref={formRef}>
            <InputText label="E-mail" name="email" disabled={!!sending} />
            <ButtonContainer>
              <ButtonTheme type="submit" disabled={!!sending}>
                {sending ? 'Aguarde, estamos enviando' : 'Enviar'}
              </ButtonTheme>
            </ButtonContainer>
          </Form>
        </>
      )}

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
  justify-content: center;
  padding: 4px;
  gap: 10px;

  button {
    margin: 0 2px;
  }
`
