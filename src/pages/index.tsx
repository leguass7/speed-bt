import { Divider } from '@mui/material'
import type { NextPage } from 'next'

import { TopHome } from '~/components/app/TopHome'
import { Layout } from '~/components/Layout'
import { PreRegistration } from '~/components/PreRegistration'
import { PageContainer } from '~/components/styled'
// import { SubscribeCards } from '~/components/SubscribeCards'

const Home: NextPage = () => {
  return (
    <Layout>
      <PageContainer>
        <TopHome />
        <Divider />
        <PreRegistration />
        {/* <FlexContainer justify="center" verticalPad={22} gap={20} horizontalPad={8}>
          <div>
            <ButtonTheme onClick={handleClick}>CADASTRE-SE</ButtonTheme>
          </div>
          <div>
            <ButtonGoogle />
          </div>
        </FlexContainer> */}
        <Divider />
        {/* <SubscribeCards /> */}
      </PageContainer>
    </Layout>
  )
}

export default Home
