import styled from 'styled-components'

export const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl}px;
  border: 0;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  align-items: center;
  align-content: flex-start;

  svg {
    max-width: 100% !important;
    display: block;
  }

  img {
    max-width: 100% !important;
    display: block;
  }
`

export const ImageContainer = styled.div`
  border: 0;
  display: flex;
  justify-content: center;
  margin-top: ${({ theme }) => theme.spacing.xl}px;
  padding-top: ${({ theme }) => theme.spacing.xl}px;
  padding-bottom: ${({ theme }) => theme.spacing.xl}px;
`
