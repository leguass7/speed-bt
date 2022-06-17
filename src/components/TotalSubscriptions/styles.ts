import styled from 'styled-components'

export const ChartContainer = styled.div<{ chartWidth?: string }>`
  width: ${({ chartWidth = '160px' }) => chartWidth};
  border: 0;
  position: relative;
  min-width: 100px;
  max-width: 120px;
`

export const ContainerText = styled.div`
  padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.l}px`};
  border: 0;
  h2 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
    font-weight: normal;
  }
`

export const ContainerLine = styled.div`
  width: 100%;
  max-width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  flex-flow: row nowrap;
  border: 0;
  margin: 10px 0;

  ${ChartContainer} {
    margin-right: 10px;
    margin: 0;
  }

  ${ContainerText} {
    flex: 1;
    text-align: center;
  }

  @media (min-width: 513px) {
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    width: 50%;
    max-width: 50%;
    text-align: center;
    ${ChartContainer} {
      margin: 0 auto;
      margin-bottom: 10px;
    }
  }
`

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 10px;
  @media (max-width: 512px) {
    width: 100%;
  }
`
