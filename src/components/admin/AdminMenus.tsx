import React from 'react'

import { Divider } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import styled from 'styled-components'

import { useUserAuth } from '../UserProvider'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl}px;
  a {
    font-size: 14px;
  }
`

export const AdminMenus: React.FC = () => {
  const { userData } = useUserAuth()
  return (
    <>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Site</Link>
          <Typography color="text.primary">Admin</Typography>
          {userData?.level >= 9 ? <Link href="/admin/config">Config</Link> : null}
          <Link href="/admin/temp">Inscrições</Link>
          <Link href="/admin/users">Cadastros</Link>
        </Breadcrumbs>
      </Container>
      <Divider />
    </>
  )
}
