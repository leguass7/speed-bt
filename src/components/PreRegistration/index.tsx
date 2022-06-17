import React from 'react'

import { useRouter } from 'next/router'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { ButtonTheme } from '~/components/ButtonTheme'
import { Title } from '~/components/styled'
import { useUserAuth } from '~/components/UserProvider'

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
            <Title textColor={theme.colors.primary}>Pré-inscrições</Title>
            <p>Relize o cadastro para facilitar o processo de inscrição</p>
          </ContainerItem>
          <ContainerItem>
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
