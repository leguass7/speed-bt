import styled from 'styled-components'

export const ChartContainer = styled.div<{ chartWidth?: string }>`
  width: ${({ chartWidth = '160px' }) => chartWidth};
`

export const Container = styled.div`
  display: flex;
  width: 62%;
  margin: 0 auto;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`
