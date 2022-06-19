import React, { useEffect, useState } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import GitHubIcon from '@mui/icons-material/GitHub'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CSSProperties } from 'styled-components'

import favicon from '~/assets/favicon.png'
import { HeaderBar } from '~/components/HeaderBar'

import { AdminMenus } from '../admin/AdminMenus'
import { useUserAuth } from '../UserProvider'
import { Footer, LayoutContainer, FooterItem } from './styles'

type Props = {
  children?: React.ReactNode
  admin?: boolean
  pageTitle?: string
}
export const Layout: React.FC<Props> = ({ children, admin, pageTitle = 'Arena Speed - Beach Tennis' }) => {
  const [top, setTop] = useState(10)
  const { authenticated, userData, loading } = useUserAuth()
  const { push } = useRouter()

  const { ref } = useResizeDetector()

  const onLayoutHeader = (h?: number) => setTop(h || 0)

  const styleMain: CSSProperties = { paddingTop: authenticated ? top : 0 }

  useEffect(() => {
    if (admin) {
      if ((!authenticated && !loading) || userData?.level < 8) {
        push('/')
      }
    }
  }, [push, authenticated, loading, userData, admin])

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="Primeira Resenha Open Speed de Beach Tennis. Cadastre-se" />
        <link rel="icon" href={favicon.src} />
        <meta name="theme-color" content="#151515" />
      </Head>
      <LayoutContainer style={styleMain}>
        <main ref={ref}>
          {admin ? <AdminMenus /> : null}
          {children}
        </main>
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
