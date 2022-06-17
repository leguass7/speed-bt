import { Divider } from '@mui/material'
import type { NextPage } from 'next'

import { TopHome } from '~/components/app/TopHome'
import { Layout } from '~/components/Layout'
import { PreRegistration } from '~/components/PreRegistration'
import { PageContainer } from '~/components/styled'
import { TotalSubscriptions } from '~/components/TotalSubscriptions'

const Home: NextPage = () => {
  return (
    <Layout>
      <PageContainer>
        <TopHome />
        <Divider />
        <PreRegistration />
        <Divider />
        <TotalSubscriptions />
        <Divider />
      </PageContainer>
    </Layout>
  )
}

export default Home
