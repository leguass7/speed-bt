import { Divider } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { PageContainer } from '~/components/styled'
import { SaveSubscription } from '~/components/subscription/SaveSubscription'
import { SelectSubscriptionCategory } from '~/components/subscription/SelectSubscriptionCategory'
import { SubscriptionProvider } from '~/components/subscription/SubscriptionProvider'
import { UserSubscriptions } from '~/components/subscription/UserSubscriptions'
import type { ICategory } from '~/server-side/category/category.dto'
import { list } from '~/server-side/category/category.service'

export type SubscriptionPageProps = {
  categories?: ICategory[]
}

const SubscriptionPage: NextPage<SubscriptionPageProps> = ({ categories = [] }) => {
  const { theme } = useAppTheme()
  const { push } = useRouter()
  return (
    <SubscriptionProvider>
      <Layout>
        <PageContainer horizontalPad={theme.spacing.l}>
          <PageTitle title={'INSCRIÇÃO'} weight="normal" onBack={() => push('/')} />
          <br />
          <SelectSubscriptionCategory categories={categories} />
          <br />
          <Divider />
          <UserSubscriptions categories={categories} />
          <br />
          <Divider />
          <SaveSubscription />
          <br />
        </PageContainer>
      </Layout>
    </SubscriptionProvider>
  )
}

export default SubscriptionPage

export const getServerSideProps: GetServerSideProps<SubscriptionPageProps> = async ({}) => {
  const categories = await list()
  return {
    props: { categories }
  }
}
