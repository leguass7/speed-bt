import styled from 'styled-components'

import type { TextProps } from '~/components/styled'

// import { Container } from './styles';

export const PageTitleContainer = styled.div<TextProps>`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  padding-top: ${({ theme }) => theme.spacing.l}px;
  gap: ${({ theme }) => theme.spacing.l}px;
  h1 {
    color: ${({ textColor = 'inherit' }) => textColor};
    font-weight: ${({ weight = 'bold' }) => weight};
  }
  h2 {
    color: ${({ textColor = 'inherit' }) => textColor};
    font-weight: ${({ weight = 'bold' }) => weight};
  }
`
