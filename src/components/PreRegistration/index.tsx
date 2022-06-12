import React from 'react'

import { useRouter } from 'next/router'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { ButtonTheme } from '~/components/ButtonTheme'
import { ButtonGoogle } from '~/components/ButtonTheme/ButtonGoogle'
import { Title } from '~/components/styled'
import { useUserAuth } from '~/components/UserProvider'

import { RegisterSuccess } from './RegisterSuccess'
import { ContainerRegistration, ContainerItem } from './styles'

export const PreRegistration: React.FC = () => {
  const { theme } = useAppTheme()
  const { push } = useRouter()
  const { authenticated, userData } = useUserAuth()

  const handleClick = () => {
    push('/register')
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
            <ButtonTheme onClick={handleClick}>CADASTRE-SE</ButtonTheme>
            {!authenticated ? (
              <>
                <br />
                <br />
                <ButtonGoogle />
              </>
            ) : null}
          </ContainerItem>
        </>
      )}
    </ContainerRegistration>
  )
}
