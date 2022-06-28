import { MenuItem } from '@mui/material'
import styled, { css } from 'styled-components'

import { alpha } from '~/helpers/colors'

export const Tools = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  gap: ${({ theme }) => theme.spacing.m}px;
`

export const MenuItemStyled = styled(MenuItem)`
  padding-right: ${({ theme }) => theme.spacing.l}px;
  .MuiSvgIcon-root {
    margin-right: ${({ theme }) => theme.spacing.xl}px;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`

export const CellContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-content: center;
  border: 0;
`

export const Span = styled.span<{ textColor?: string }>`
  font-size: 12px;
  color: ${({ textColor }) => textColor || 'inherit'};
`

export const P = styled.p<{ textColor?: string; linkColor?: string }>`
  display: block;
  padding: 0;
  font-size: 12px;
  margin: 0;
  color: ${({ textColor = 'inherit' }) => textColor};
  a {
    text-decoration: none;
    color: ${({ textColor, linkColor }) => linkColor || textColor || 'inherit'};
  }
  ${({ textColor, linkColor }) =>
    textColor || linkColor
      ? css`
          a:hover {
            color: ${alpha(linkColor || textColor, 0.7)};
          }
        `
      : css``}
`
