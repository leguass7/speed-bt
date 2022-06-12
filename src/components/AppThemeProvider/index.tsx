import React from 'react'

import { ThemeProvider } from './Provider'
import { ThemeProviderProps } from './types'

export const AppThemeProvider: React.FC<ThemeProviderProps> = ({ children, themeName }) => {
  return <ThemeProvider themeName={themeName}>{children}</ThemeProvider>
}
