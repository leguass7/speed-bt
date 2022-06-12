import { memo } from 'react'
// import { renderToStaticMarkup } from 'react-dom/server'

import { createGlobalStyle, css } from 'styled-components'

import { gilroyCss } from '~/styles/fonts'

const globCss = css`
  h2 {
    font-size: 20px;
  }
  a {
    text-decoration: none;
  }
  /* a:hover {
    text-decoration: underline;
  } */
`

const GlobalStyle = createGlobalStyle`
  ${gilroyCss}

  * {
     box-sizing: border-box;
     margin: 0;
     padding: 0;
  }

  html {
    height: 100%;
    margin: 0 auto;
    padding: 0;
  }

  body {
    position: relative;
    margin: 0 auto;
    padding: 0;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-attachment: fixed;
    min-height: 100vh;
    height: 100%;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    font-family: Gilroy, Tahoma, Geneva, Verdana, sans-serif;
    border: 0;
  }

  #__next{
    position: relative;
    min-height: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    overflow-x: hidden !important;
    box-sizing: border-box !important;
    background-color: ${({ theme }) => theme.colors.background};
    border: 0;
    ${globCss}
  }
`

export default memo(GlobalStyle)
