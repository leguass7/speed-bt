import React from 'react'

import Badge from '@mui/material/Badge'
import { styled } from '@mui/material/styles'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'

// import { Container } from './styles';

type Props = {
  children: React.ReactNode
  disabled?: boolean
}
export const RippleBadge: React.FC<Props> = ({ children, disabled }) => {
  const { theme } = useAppTheme()

  const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
      backgroundColor: theme.colors.errors,
      color: theme.colors.errors,
      boxShadow: `0 0 0 2px ${theme.colors.white}`,

      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""'
      }
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(0.9)',
        opacity: 1
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0
      }
    }
  }))

  return (
    <>
      {disabled ? (
        children
      ) : (
        <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot">
          {children}
        </StyledBadge>
      )}
    </>
  )
}
