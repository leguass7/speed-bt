import styled, { css } from 'styled-components'

export type AlignType = 'center' | 'left' | 'right' | 'justify' | 'inherit'
export type FlexJustify = 'space-between' | 'flex-start' | 'flex-end' | 'space-around' | 'center' | 'space-evenly'
export type FlexAlign = 'center' | 'stretch' | 'baseline' | 'flex-start' | 'flex-end'

export type TextProps = {
  weight?: 'bold' | 'normal'
  textColor?: string
  textSize?: number
}

export type FlexProps = {
  align?: FlexAlign
  justify?: FlexJustify
  grow?: number
  horizontalPad?: number
  verticalPad?: number
  width?: string
  gap?: number
}

export const PageContainer = styled.div`
  display: block;
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0;
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

export const Title = styled.h2<TextProps>`
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
`
