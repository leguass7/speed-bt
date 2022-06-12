import React from 'react'

import { brighten } from '~/helpers/colors'

import { VariantColorsTypes } from '../AppThemeProvider/types'
import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { Button } from './styles'

export type ButtonThemeProps = {
  children?: React.ReactNode
  themeColor?: VariantColorsTypes
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'button' | 'reset' | 'submit'
}

export const ButtonTheme: React.FC<ButtonThemeProps> = ({ type = 'button', children, themeColor = 'primary', onClick, disabled }) => {
  const { theme, matchingBackgroudText } = useAppTheme()

  const bgColor = theme.colors[themeColor]
  const textColor = matchingBackgroudText(themeColor)
  const hover = brighten(bgColor, 0.5)

  return (
    <Button type={type} bgColor={bgColor} hoverColor={hover} textColor={textColor} onClick={onClick} disabled={!!disabled}>
      <span>{children}</span>
    </Button>
  )
}
