import React from 'react'

import CheckIcon from '@mui/icons-material/Check'
import Link from 'next/link'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { Title } from '../styled'
import { ContainerItem } from './styles'

export const RegisterSuccess: React.FC = () => {
  const { theme } = useAppTheme()

  return (
    <ContainerItem textColor={theme.colors.white}>
      <Title textColor={theme.colors.primary}>
        <CheckIcon /> Cadastro efetuado com sucesso!
      </Title>
      <p>
        Faça sua inscrição <Link href={'/subscription'}>Formulário de inscrição</Link>
      </p>
      <p>
        <i>
          Não esqueça de informar o tamanho da sua camiseta <Link href={'/register'}>Seu cadastro</Link>
        </i>
      </p>
    </ContainerItem>
  )
}
