import React from 'react'

import CheckIcon from '@mui/icons-material/Check'

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
      <p>Aguarde até o inicio das inscrições para garantir sua vaga.</p>
      <p>
        <i>Avisaremos quando as instcrições estiverem abertas</i>
      </p>
    </ContainerItem>
  )
}
