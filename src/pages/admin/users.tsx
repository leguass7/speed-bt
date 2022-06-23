import { Card, CardContent, Grid } from '@mui/material'
import type { NextPage } from 'next'

import { TableUsers } from '~/components/admin/TableUsers'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'

const AdminUsersPage: NextPage = () => {
  return (
    <Layout admin>
      <PageTitle title="Usuários cadastrados" weight="normal" horizontalPad={10} />
      <Grid container spacing={1} padding={1}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card>
            <CardContent>
              <TableUsers />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default AdminUsersPage
