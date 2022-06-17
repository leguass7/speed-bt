import Document, { Head, Html, Main, NextScript, DocumentContext } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

//@ts-ignore
export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt_BR" />
          <meta property="og:title" content="Arena Speed - Beach Tennis" />
          <meta property="og:description" content="Primeira Resenha Open Speed de Beach Tennis. Cadastre-se" />
          <meta name="description" content="Primeira Resenha Open Speed de Beach Tennis. Cadastre-se" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
          <meta property="og:image" content="https://speed.avatarsolucoesdigitais.com.br/face.png" />
          <meta property="og:site_name" content="Arena Speed BT" />
        </Head>
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
