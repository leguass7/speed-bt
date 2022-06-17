import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.min.css'
import 'react-circular-progressbar/dist/styles.css'
import { ToastContainer } from 'react-toastify'

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import ptBr from 'date-fns/locale/pt-BR'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { AppThemeProvider } from '~/components/AppThemeProvider'
import { SocketProvider } from '~/components/SocketProvider'
import { UserProvider } from '~/components/UserProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps?.session}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBr}>
        <UserProvider>
          <SocketProvider>
            <AppThemeProvider themeName="common">
              <Component {...pageProps} />
              <ToastContainer
                theme="colored"
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                draggable
                pauseOnHover
              />
            </AppThemeProvider>
          </SocketProvider>
        </UserProvider>
      </LocalizationProvider>
    </SessionProvider>
  )
}

export default MyApp
