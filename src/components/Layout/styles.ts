import styled from 'styled-components'

export const FooterItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  gap: ${({ theme }) => theme.spacing.l}px;
`

export const Footer = styled.footer`
  display: block;
  width: 100%;
  max-width: 100%;
  padding: ${({ theme }) => theme.spacing.l}px;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  border: 0;
  color: ${({ theme }) => theme.colors.white};
  a,
  a:visited,
  a:focus {
    text-decoration: none !important;
    color: ${({ theme }) => theme.colors.white} !important;
    font-size: 12px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    align-content: center;
    gap: ${({ theme }) => theme.spacing.s}px;
  }
`

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: nowrap;
  width: 100%;
  max-width: 100%;
  height: 100%;
  transition: all ease-in-out 0.3s;
  main {
    transition: all ease-in-out 0.3s;
    flex: 1;
  }
`
