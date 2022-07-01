import styled, { css } from 'styled-components'

import type { VariantColorsTypes } from './AppThemeProvider/types'

export type AlignType = 'center' | 'left' | 'right' | 'justify' | 'inherit'
export type FlexJustify = 'space-between' | 'flex-start' | 'flex-end' | 'space-around' | 'center' | 'space-evenly'
export type FlexAlign = 'center' | 'stretch' | 'baseline' | 'flex-start' | 'flex-end'

export type TextProps = {
  weight?: 'bold' | 'normal'
  textColor?: string
  textSize?: number
}

export type SpacingProps = {
  horizontalPad?: number
  verticalPad?: number
}

export type FlexProps = SpacingProps & {
  align?: FlexAlign
  justify?: FlexJustify
  grow?: number
  width?: string
  gap?: number
}

export type MarginProps = {
  topMargin?: number
  bottomMargin?: number
  leftMargin?: number
  rightMargin?: number
  verticalSpaced?: boolean
  horizontalSpaced?: boolean
}

export type SimpleTextProps = MarginProps & {
  bold?: boolean
  themeColor?: VariantColorsTypes
  size?: number
  textColor?: string
  align?: AlignType
}

export const PageContainer = styled.div<SpacingProps>`
  display: block;
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  padding: ${({ horizontalPad = 0, verticalPad = 0 }) => `${verticalPad}px ${horizontalPad}px`};
`

export const SuperHeader = styled.h1<{ textColor?: string; align?: AlignType }>`
  display: block;
  font-size: 2.5rem;
  color: ${({ textColor = 'inherit' }) => textColor};
  text-align: ${({ align = 'center' }) => align};
  margin: 0;
  padding: ${({ theme }) => `${theme.spacing.xl}px ${theme.spacing.l}px`};
  font-family: Gilroy;
  font-weight: normal;
`

export const FlexContainer = styled.div<FlexProps>`
  display: flex;
  justify-content: ${({ justify = 'space-between' }) => justify};
  align-items: center;
  align-content: center;
  width: ${({ width = '100%' }) => width};
  padding: ${({ horizontalPad = 0, verticalPad = 0 }) => `${verticalPad}px ${horizontalPad}px`};
  gap: ${({ gap = 0 }) => gap}px;
  ${({ grow }) =>
    grow
      ? css`
          flex: ${grow};
        `
      : css``}
`

export const Span = styled.span<TextProps>`
  color: ${({ textColor = 'inherit' }) => textColor};
  font-size: ${({ textSize = 14 }) => textSize}px;
`

export const Title = styled.h2<TextProps & SpacingProps>`
  vertical-align: middle;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  gap: ${({ theme }) => theme.spacing.m}px;
  color: ${({ textColor = 'inherit' }) => textColor};
  font-size: ${({ textSize = 20 }) => textSize}px !important;
  font-weight: ${({ weight = 'normal' }) => weight};
  font-family: Gilroy, Tahoma, Geneva, Verdana, sans-serif;
  padding: ${({ horizontalPad = 0, verticalPad = 0 }) => `${verticalPad}px ${horizontalPad}px`};
`

export const Paragraph = styled.p<SimpleTextProps & { width?: string }>`
  display: block;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
  width: ${({ width = '100%' }) => width};
  font-size: ${({ size }) => size}px;
  text-align: ${({ align = 'left' }) => align};
  color: ${({ textColor = 'inherit' }) => textColor};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  padding-top: ${({ theme, topMargin = 0, verticalSpaced }) => (verticalSpaced && !topMargin ? theme.spacing.l : topMargin)}px;
  padding-bottom: ${({ theme, bottomMargin = 0, verticalSpaced }) => (verticalSpaced ? theme.spacing.l : bottomMargin)}px;
  padding-right: ${({ horizontalSpaced, theme, rightMargin = 0 }) => (horizontalSpaced ? theme.spacing.l : rightMargin)}px;
  padding-left: ${({ horizontalSpaced, theme, leftMargin = 0 }) => (horizontalSpaced ? theme.spacing.l : leftMargin)}px;
  a {
    text-decoration: underline;
  }
`

export const LinkGoogle = styled.button`
  display: inline-block;
  background-color: transparent;
  font-family: 'Gilroy';
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.l}px`};
  border-radius: ${({ theme }) => theme.spacing.m}px;
  cursor: pointer;
`

export const BoxCenter = styled.div`
  border: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`
