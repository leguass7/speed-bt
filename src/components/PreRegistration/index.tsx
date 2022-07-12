import React from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { ButtonTheme } from '~/components/ButtonTheme'
import { Title } from '~/components/styled'
import { useUserAuth } from '~/components/UserProvider'

import { ButtonGoogle } from '../ButtonTheme/ButtonGoogle'
import { RegisterSuccess } from './RegisterSuccess'
import { ContainerRegistration, ContainerItem } from './styles'

export const PreRegistration: React.FC = () => {
  const { theme } = useAppTheme()
  const { push } = useRouter()
  const { authenticated, userData } = useUserAuth()

  const handleClick = (path: string) => () => {
    push(path)
  }

  return (
    <ContainerRegistration textColor={theme.colors.white}>
      {userData && userData?.completed ? (
        <RegisterSuccess />
      ) : (
        <>
          <ContainerItem>
            <Title textColor={theme.colors.primary}>
              Inscrições estão <strong>ENCERRADAS</strong>!
            </Title>
            <br />
            <ul>
              <li>
                Esqueceu a senha? <Link href={'/forgot'}>clique aqui para recuperar</Link>
              </li>
              <li>Para gerar pagamento pelo PIX será necessário informar o seu CPF</li>
              <li>
                Leia o regulamento aqui{' '}
                <a href="/regulamento.pdf" target="_blank" title="Regulamento">
                  REGULAMENTO
                </a>
              </li>
            </ul>
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
