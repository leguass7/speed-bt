import 'styled-components'
import React from 'react'
import { SweetAlertProps as S } from 'react-bootstrap-sweetalert/dist/types'

import { IAppTheme } from '~/components/AppThemeProvider/themes'

declare module 'styled-components' {
  export interface DefaultTheme extends IAppTheme {}
}

declare module 'react-bootstrap-sweetalert' {
  export interface SweetAlertProps extends S {
    children?: React.ReactNode
  }
}
