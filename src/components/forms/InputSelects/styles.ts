import styled from 'styled-components'

export const Container = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;

  padding: 0 ${({ theme }) => theme.spacing.l}px;
  margin-bottom: ${({ theme }) => theme.spacing.l}px;
`
export const FlexContainer = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 10px;
`
