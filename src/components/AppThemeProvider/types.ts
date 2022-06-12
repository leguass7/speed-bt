import type { SetStateAction, Dispatch, ReactNode } from 'react'

import type { IAppTheme, ThemeName } from './themes'

export type { IAppTheme }
export interface IThemeSpacing {
  xs: number
  s: number
  m: number
  l: number
  xl: number
}

export interface ThemeColors {
  primary: string
  secondary: string
  contrast: string
  text: string
  border: string
  white: string
  black: string
  shadow: string
  textDark: string
  background: string
  success: string
  errors: string
  warning: string
  info: string
}

export interface IThemeContext {
  isDark: boolean
  setIsDark: Dispatch<SetStateAction<boolean>>
  theme: IAppTheme
  // setTheme: Dispatch<SetStateAction<IAppTheme>>
  matchRules: MatchingRules
  isMobile: boolean
  setThemeName: Dispatch<SetStateAction<ThemeName>>
  themeName: ThemeName
}

export type VariantColorsTypes = keyof ThemeColors

export type TextColor = string
// @ts-ignore
export type MatchingRules = [...VariantColorsTypes[], TextColor][]

type MatchBackground = {
  textColor: string
  bgColor: string
}
export interface IUseAppTheme extends Omit<IThemeContext, 'matchRules'> {
  matchingBackgroudText: (_themeKeyColor?: VariantColorsTypes, _defColor?: string) => string
  matchBackground: (_themeKeyColor?: VariantColorsTypes, _defColor?: string) => MatchBackground
}

export type ThemeProviderProps = {
  themeName: ThemeName
  children: ReactNode
}
