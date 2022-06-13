import React, { useCallback, useEffect, useRef } from 'react'
import { useResizeDetector } from 'react-resize-detector'

// import MenuIcon from '@mui/icons-material/Menu'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
// import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import { useSession } from 'next-auth/react'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { ProfilePopover } from './ProfilePopover'

type Props = {
  onLayout?: (headerHeigh?: number) => void
}
export const HeaderBar: React.FC<Props> = ({ onLayout }) => {
  const { theme } = useAppTheme()
  const { status } = useSession()
  const headerHeightRef = useRef(-1)
  const { height, ref } = useResizeDetector()

  const emitLayout = useCallback((h: number) => onLayout && onLayout(h), [onLayout])

  useEffect(() => {
    if (height && height !== headerHeightRef.current) {
      headerHeightRef.current = height
      emitLayout(height)
    }
  }, [height, emitLayout])

  return status === 'authenticated' ? (
    <AppBar ref={ref} sx={{ backgroundColor: theme.colors.primary }}>
      <Toolbar>
        {/* <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton> */}
        <Typography component="div" sx={{ flexGrow: 1 }}>
          {' '}
        </Typography>
        <ProfilePopover />
      </Toolbar>
    </AppBar>
  ) : null
}
