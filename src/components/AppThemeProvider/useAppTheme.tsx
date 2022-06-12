import { useContext, useCallback } from 'react'

import { useMediaQuery, useTheme } from '@mui/material'

import { ThemeContext } from './ThemeContext'
import { IUseAppTheme, MatchingRules, TextColor, VariantColorsTypes } from './types'

export function useAppTheme(): IUseAppTheme {
  const { theme, isDark, matchRules, setIsDark, setThemeName, themeName } = useContext(ThemeContext)

  const { breakpoints } = useTheme()
  const isMobile = useMediaQuery(breakpoints.down('md'))

  /**
   * @function matchingBackgroudText
   * @description
   * Procura a cor ideal para o texto correspondendo com a cor de fundo do tema.
   * As regras são configuradas na constante `matchRules`
   * @example
   * matchingBackgroudText('primary') // return #ffffff
   */
  const matchingBackgroudText = useCallback(
    (themeKeyColor?: VariantColorsTypes, defColor?: TextColor) => {
      return themeKeyColor ? findMatches(matchRules, themeKeyColor, defColor || theme.colors.text) : defColor || theme.colors.text
    },
    [theme, matchRules]
  )

  const matchBackground = useCallback(
    (themeKeyColor?: VariantColorsTypes) => {
      return {
        bgColor: themeKeyColor ? theme.colors[themeKeyColor] : '#f0f',
        textColor: matchingBackgroudText(themeKeyColor, theme.colors.text)
      }
    },
    [theme, matchingBackgroudText]
  )

  return {
    theme,
    isDark,
    setIsDark,
    matchingBackgroudText,
    matchBackground,
    isMobile,
    setThemeName,
    themeName
  }
}

function findMatches(rules: MatchingRules, value: VariantColorsTypes, defaultValue = ''): string {
  const [themeColor] = rules.find(word => !!(word && word.slice(0, word.length - 1)?.includes(value)))?.slice(-1) || [defaultValue]
  return themeColor
}

export function useAppMediaQuery() {
  return {}
}
