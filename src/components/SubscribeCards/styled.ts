import styled from 'styled-components'

export const Price = styled.p`
  font-size: 18px;
  padding-top: ${({ theme }) => theme.spacing.m}px;
`

export const CardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  width: 100%;
  max-width: 180px;
  flex-flow: column nowrap;
  height: 100%;
  text-align: center;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  border-radius: ${({ theme }) => theme.spacing.l}px;
  padding: ${({ theme }) => theme.spacing.m}px;
`

export const CardItem = styled.div`
  display: flex;
  justify-content: center;
  border: 0;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl}px;

  @media (min-width: 420px) {
    width: 50%;
  }

  @media (min-width: 580px) {
    width: 33.333%;
  }
  @media (min-width: 700px) {
    width: 25%;
  }
`

export const Container = styled.div<{ bgColor: string; textColor: string }>`
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  align-items: stretch;
  align-content: stretch;
  padding-top: ${({ theme }) => theme.spacing.xl}px;
  ${CardContainer} {
    background-color: ${({ bgColor }) => bgColor};
    color: ${({ textColor }) => textColor};
  }
`
