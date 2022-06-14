import styled, { css } from 'styled-components'

export type VariantType = 'outline' | 'default'
export const SearchWrapper = styled.div<{ hasError?: boolean; size?: string; variant?: VariantType }>`
  width: ${props => props?.size ?? '100%'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${({ theme }) => theme.spacing.m}px;
  padding-right: ${({ theme }) => theme.spacing.m}px;
  border-bottom: 1px solid ${({ theme, hasError }) => (hasError ? theme.colors.errors : theme.colors.border)};

  margin-top: 0;
  padding-top: 10px;

  ${({ variant, hasError, theme }) =>
    variant === 'outline'
      ? css`
          border-color: ${hasError ? theme.colors.errors : theme.colors.border};
          border-radius: ${({ theme }) => theme.rounded}px;
          border-width: 1px;
          border-style: solid;
          padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.l}px`};
        `
      : null}
`

export const SearchInput = styled.div`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing.s}px;

  input {
    border: 0;
    width: 100%;
    max-width: 100%;
    font-size: 16px;
    color: ${({ theme }) => theme.colors.primary};
    padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.m}px`};
    outline: none;
    background-color: transparent;
  }
`
export const SearchIcon = styled.div`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.primary};
  button {
    border: 0;
    background-color: transparent;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const TextError = styled.span`
  padding: 0;
  margin: 0;
  transition: all ease-in-out 0.2s;
  font-size: 10px;
  color: ${({ theme }) => theme.colors.errors};
`
export const SearchContainer = styled.div<{ disabled?: boolean }>`
  padding: ${({ theme }) => theme.spacing.l}px;
  background-color: ${({ theme }) => theme.colors.white};
  background-color: transparent;
  margin-bottom: ${({ theme }) => theme.spacing.l}px;
  transition: all ease-in-out 0.2s;
  ${SearchInput} {
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  }
  ${SearchIcon} {
    button {
      cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    }
  }
  ${({ disabled }) =>
    disabled
      ? css`
          filter: grayscale(100%);
        `
      : css``}
`
