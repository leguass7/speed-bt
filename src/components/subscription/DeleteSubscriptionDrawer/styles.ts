import styled from 'styled-components'

export const Container = styled.div`
  /* min-height: 62vh; */
  max-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: center;
  align-content: center;
  padding: ${({ theme }) => theme.spacing.l}px;
`

export const ContentLimit = styled.div`
  max-width: 100%;
  width: 800px;
  height: 100%;
  min-height: 240px;
  border: 0;
  /* position: relative; */
`
