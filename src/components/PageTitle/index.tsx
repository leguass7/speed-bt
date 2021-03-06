import React from 'react'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

import { IconButton } from '@mui/material'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { TextProps } from '~/components/styled'

import { PageTitleContainer } from './styles'

type Props = TextProps & {
  title?: string
  onBack?: () => void
  horizontalPad?: number
  verticalPad?: number
  children?: React.ReactNode
}
export const PageTitle: React.FC<Props> = ({ title, textColor, weight = 'bold', onBack, children, horizontalPad, verticalPad }) => {
  const { theme } = useAppTheme()
  return (
    <PageTitleContainer textColor={textColor || theme.colors.text} weight={weight} horizontalPad={horizontalPad} verticalPad={verticalPad}>
      {onBack ? (
        <IconButton color="primary" size="medium" onClick={onBack}>
          <MdOutlineArrowBackIosNew size={20} />
        </IconButton>
      ) : null}
      {children ? children : <h1>{title}</h1>}
    </PageTitleContainer>
  )
}
