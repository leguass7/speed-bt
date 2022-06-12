import { createContext } from 'react'

import { IThemeContext } from './types'

const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

export { ThemeContext }
