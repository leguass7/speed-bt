import React, { useMemo } from 'react'

import GoogleIcon from '@mui/icons-material/Google'
import { Avatar } from '@mui/material'
import { signIn, signOut, useSession } from 'next-auth/react'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { brighten } from '~/helpers/colors'

import { Button } from '../styles'

import type { ButtonThemeProps } from '..'

export const ButtonGoogle: React.FC<ButtonThemeProps> = ({ themeColor = 'primary', onClick, disabled, type = 'button' }) => {
  const { theme, matchingBackgroudText } = useAppTheme()
  const session = useSession()

  const bgColor = theme.colors[themeColor]
  const textColor = matchingBackgroudText(themeColor)
  const hover = brighten(bgColor, 0.5)

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (...args) => {
    if (onClick) onClick(...args)
    if (session.status === 'unauthenticated') signIn('google')
    else signOut()
  }

  const [loading, authenticated] = useMemo(() => {
    return [!!(session.status === 'loading'), !!(session.status === 'authenticated')]
  }, [session])

  return (
    <>
      {authenticated && session.data?.user?.image ? <></> : null}
      <Button type={type} bgColor={bgColor} hoverColor={hover} textColor={textColor} onClick={handleClick} disabled={!!disabled}>
        <span>
          {authenticated && session.data?.user?.image ? <Avatar src={session.data.user.image} sx={{ width: 28, height: 28 }} /> : <GoogleIcon />}

          {loading ? 'verificando' : <>{authenticated ? session.data?.user?.name || 'Sair da conta' : 'Usar conta do google'}</>}
        </span>
      </Button>
    </>
  )
}
