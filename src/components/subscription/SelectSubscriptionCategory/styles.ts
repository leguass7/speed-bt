import { alpha } from '@mui/material'
import styled, { css } from 'styled-components'

export const ItemContainer = styled.div<{ disabled?: boolean; highlight?: boolean; selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  color: ${({ theme }) => theme.colors.textDark};
  padding: ${({ theme }) => theme.spacing.m}px;
  padding-left: 0;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ theme, selected }) => (selected ? theme.colors.primary : theme.colors.text)};
  background-color: ${({ theme, disabled }) => (disabled ? alpha(theme.colors.text, 0.3) : theme.colors.text)};
  border-radius: ${({ theme }) => theme.spacing.s}px;
  font-weight: bold;
  transition: all ease-in-out 0.3s;

  &:hover {
    border-color: ${({ theme, disabled }) => (disabled ? theme.colors.text : theme.colors.primary)};
  }

  ${({ highlight }) =>
    highlight
      ? css`
          border-color: ${({ theme }) => theme.colors.primary};
        `
      : css``}
`

export const ItemsList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: ${({ theme }) => theme.spacing.l}px;
  ${ItemContainer} {
    min-width: 20%;
  }
`
