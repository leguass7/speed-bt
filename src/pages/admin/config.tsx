import { useEffect } from 'react'

import { CardContent } from '@mui/material'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FormConfig } from '~/components/admin/FormConfig'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { useUserAuth } from '~/components/UserProvider'

const AdminConfigPage: NextPage = () => {
  const { authenticated, userData, loading } = useUserAuth()

  const { push } = useRouter()

  useEffect(() => {
    if ((!authenticated && !loading) || userData?.level < 8) {
      push('/')
    }
  }, [push, authenticated, loading, userData])

  return (
    <Layout>
      <PageTitle title="Configurações" weight="normal" horizontalPad={10} />

      <Grid container spacing={1} padding={1}>
        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <FormConfig />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default AdminConfigPage
