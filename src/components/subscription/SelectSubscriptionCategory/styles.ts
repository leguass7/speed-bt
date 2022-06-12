import styled from 'styled-components'

export const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  color: ${({ theme }) => theme.colors.textDark};
  padding: ${({ theme }) => theme.spacing.m}px;
  padding-left: 0;
  background-color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.spacing.m}px;
  font-weight: bold;
`

export const ItemsList = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: ${({ theme }) => theme.spacing.l}px;
  ${ItemContainer} {
    min-width: 20%;
  }
`
