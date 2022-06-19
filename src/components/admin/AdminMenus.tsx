import React from 'react'

import { Divider } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import styled from 'styled-components'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl}px;
  a {
    font-size: 14px;
  }
`

export const AdminMenus: React.FC = () => {
  return (
    <>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link href="/">Site</Link>
          <Typography color="text.primary">Admin</Typography>
          <Link href="/admin/config">Config</Link>
          <Link href="/admin/temp">Inscrições</Link>
        </Breadcrumbs>
      </Container>
      <Divider />
    </>
  )
}
