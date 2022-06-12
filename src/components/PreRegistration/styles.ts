import styled from 'styled-components'

import { TextProps } from '../styled'

export const ContainerItem = styled.div<{ textColor?: string }>`
  padding: ${({ theme }) => theme.spacing.l}px;
  color: ${({ textColor = 'inherit' }) => textColor};
  @media (max-width: 420px) {
    width: 100%;
  }
  p {
    padding-top: ${({ theme }) => theme.spacing.l}px;
  }
`

export const ContainerRegistration = styled.div<TextProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-content: flex-start;
  flex-flow: row wrap;
  color: ${({ textColor = 'inherit' }) => textColor};
  font-size: ${({ textSize = 18 }) => textSize}px;
  font-weight: ${({ weight = 'normal' }) => weight};
  padding: ${({ theme }) => theme.spacing.l}px;
  gap: ${({ theme }) => theme.spacing.l}px;
  font-family: Gilroy, Tahoma, Geneva, Verdana, sans-serif;
  p {
    padding-top: ${({ theme }) => theme.spacing.l}px;
    display: block;
  }
`
