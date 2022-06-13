import React, { useState, useMemo } from 'react'

import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material'
import { ThemeProvider as SCThemeProvider } from 'styled-components'

import GlobalStyle from './global'
import { ThemeContext } from './ThemeContext'
import { themes, ThemeName } from './themes'
import type { IAppTheme, MatchingRules, ThemeProviderProps } from './types'

const createMuiTheme = (theme: IAppTheme) => {
  return createTheme({
    palette: {
      mode: 'dark',
      primary: { main: theme.colors.primary },
      secondary: { main: theme.colors.secondary },
      success: { main: theme.colors.success },
      contrastThreshold: 3,
      tonalOffset: 0.2
    }
  })
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, themeName = 'common' }) => {
  const [name, setName] = useState<ThemeName>(themeName)
  const [isDark, setIsDark] = useState(false)

  const theme = useMemo(() => {
    return themes[name] || themes.common
  }, [name])

  // @ts-ignore
  const matchRules: MatchingRules = useMemo(
    () => [
      ['primary', theme.colors.textDark],
      ['secondary', 'contrast', 'black', theme.colors.textDark],
      ['contrast', 'black', theme.colors.white],
      ['background', theme.colors.primary],
      ['white', theme.colors.black],
      ['border', theme.colors.black]
    ],
    [theme]
  )

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
        theme,
        matchRules,
        isMobile: false,
        setThemeName: setName,
        themeName
      }}
    >
      <SCThemeProvider theme={theme}>
        <MuiThemeProvider theme={createMuiTheme(theme)}>
          <GlobalStyle />
          {children}
        </MuiThemeProvider>
      </SCThemeProvider>
    </ThemeContext.Provider>
  )
}
