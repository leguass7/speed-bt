import { useCallback, useEffect, useState } from 'react'

import { Divider } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { CircleLoading } from '~/components/CircleLoading'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { PageContainer } from '~/components/styled'
import { SaveSubscription } from '~/components/subscription/SaveSubscription'
import { SelectSubscriptionCategory } from '~/components/subscription/SelectSubscriptionCategory'
import { SubscriptionProvider } from '~/components/subscription/SubscriptionProvider'
import { UserSubscriptions } from '~/components/subscription/UserSubscriptions'
import type { ICategory } from '~/server-side/category/category.dto'
import { getCategories } from '~/service/api/category'

const SubscriptionPage: NextPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(false)
  const { theme } = useAppTheme()
  const { push } = useRouter()

  const fetchCategory = useCallback(async () => {
    setLoading(true)
    const response = await getCategories()
    if (response?.success) setCategories(response?.categories || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCategory()
  }, [fetchCategory])

  return (
    <SubscriptionProvider>
      <Layout>
        <PageContainer horizontalPad={theme.spacing.l}>
          {loading ? (
            <CircleLoading />
          ) : (
            <>
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
            </>
          )}
        </PageContainer>
      </Layout>
    </SubscriptionProvider>
  )
}

export default SubscriptionPage
