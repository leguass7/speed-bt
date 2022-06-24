import React, { useState } from 'react'

import { Divider } from '@mui/material'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { ButtonTheme } from '~/components/ButtonTheme'
import { LinkGoogle, Title } from '~/components/styled'
import { useUserAuth } from '~/components/UserProvider'

import { ButtonGoogle } from '../ButtonTheme/ButtonGoogle'
import { RegisterSuccess } from './RegisterSuccess'
import { ContainerRegistration, ContainerItem, Div } from './styles'

export const PreRegistration: React.FC = () => {
  const { theme } = useAppTheme()
  const { push } = useRouter()
  const { authenticated, userData } = useUserAuth()
  const [loading, setLoading] = useState(false)

  const handleClick = (path: string) => () => {
    push(path)
  }

  const loginGoogle = async () => {
    if (!authenticated) {
      setLoading(true)
      await signIn('google')
      setLoading(false)
    }
  }

  return (
    <ContainerRegistration textColor={theme.colors.white}>
      {userData && userData?.completed ? (
        <RegisterSuccess />
      ) : (
        <>
          <ContainerItem>
            <Div>
              <Title textColor={theme.colors.primary}>
                Inscrições estão <strong>abertas</strong>!
              </Title>
              <p>
                Faça sua inscrição e garanta sua vaga.
                <br />
                <Link href={'/subscription'}>Formulário de inscrição</Link>
              </p>
              <br />
              <Divider />
              <br />
              <Title textColor={theme.colors.primary}>Instruções:</Title>
              <ul>
                <li>Verifique sua dupla está cadastrada, para completar a inscrição será necessário</li>
                <li>
                  Esqueceu a senha? <Link href={'/forgot'}>clique aqui para recuperar</Link>
                </li>
                <li>
                  De preferência utilize o login com o Google{' '}
                  <LinkGoogle type="button" onClick={loginGoogle}>
                    {loading ? '...aguarde' : 'usar conta do google'}
                  </LinkGoogle>
                  <br />
                  <i>(Nossa equipe prioriza cadastros validados)</i>
                </li>
                <li>Para gerar pagamento pelo PIX será necessário informar o seu CPF</li>
                <li>
                  Leia o regulamento aqui{' '}
                  <a href="/regulamento.pdf" target="_blank" title="Regulamento">
                    REGULAMENTO
                  </a>
                </li>
              </ul>
            </Div>
          </ContainerItem>
          <ContainerItem>
            <ButtonGoogle type="button" />
            <br />
            <br />
            <ButtonTheme onClick={handleClick('/login')}>Login</ButtonTheme>
            {!authenticated ? (
              <>
                <br />
                <br />
                <ButtonTheme onClick={handleClick('/register')}>CADASTRE-SE</ButtonTheme>
              </>
            ) : null}
          </ContainerItem>
        </>
      )}
    </ContainerRegistration>
  )
}
