import React, { useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import GitHubIcon from '@mui/icons-material/GitHub'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { CSSProperties } from 'styled-components'

import favicon from '~/assets/favicon.png'
import { HeaderBar } from '~/components/HeaderBar'

import { Footer, LayoutContainer, FooterItem } from './styles'

type Props = {
  children?: React.ReactNode
}
export const Layout: React.FC<Props> = ({ children }) => {
  const [top, setTop] = useState(10)

  const { status } = useSession()
  const { ref } = useResizeDetector()

  const onLayoutHeader = (h?: number) => setTop(h || 0)

  const authenticated = !!(status === 'authenticated')
  const styleMain: CSSProperties = { paddingTop: authenticated ? top : 0 }

  return (
    <>
      <Head>
        <title>Arena Speed - Beach Tennis</title>
        <meta name="description" content="Primeira Resenha Open Speed de Beach Tennis. Cadastre-se" />
        <link rel="icon" href={favicon.src} />
        <meta name="theme-color" content="#151515" />
      </Head>
      <LayoutContainer style={styleMain}>
        <main ref={ref}>{children}</main>
        <Footer>
          <FooterItem>
            <a href="https://github.com/leguass7/speed-bt" target="_blank" rel="noreferrer">
              <GitHubIcon fontSize="small" /> <span>leguass7/speed-bt</span>
            </a>
            <FooterItem>
              <a href="https://avatarsolucoesdigitais.com.br" target="_blank" rel="noreferrer">
                avatarsolucoesdigitais.com.br
              </a>
            </FooterItem>
          </FooterItem>
        </Footer>
      </LayoutContainer>
      <HeaderBar onLayout={onLayoutHeader} />
    </>
  )
}
