import styled from 'styled-components'

export const SpanPrice = styled.span<{ line?: boolean }>`
  text-decoration: ${({ line }) => (line ? 'line-through' : 'none')};
  font-size: ${({ line }) => (line ? 14 : 16)}px;
`

export const SelectMessenger = styled.p`
  min-height: 100px;
  text-align: center;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
`
