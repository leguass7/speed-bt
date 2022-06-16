import { useCallback, useEffect, useState } from 'react'

import { Button, Divider } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { ButtonGoogle } from '~/components/ButtonTheme/ButtonGoogle'
import { CircleLoading } from '~/components/CircleLoading'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { FlexContainer, PageContainer, Paragraph } from '~/components/styled'
import { SaveSubscription } from '~/components/subscription/SaveSubscription'
import { SelectSubscriptionCategory } from '~/components/subscription/SelectSubscriptionCategory'
import { SubscriptionLoader } from '~/components/subscription/SubscriptionLoader'
import { SubscriptionProvider } from '~/components/subscription/SubscriptionProvider'
import { UserSubscriptions } from '~/components/subscription/UserSubscriptions'
import { useUserAuth } from '~/components/UserProvider'
import type { ICategory } from '~/server-side/category/category.dto'
import { getCategories } from '~/service/api/category'

const SubscriptionPage: NextPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([])
  const [loading, setLoading] = useState(false)
  const { theme } = useAppTheme()
  const { push } = useRouter()
  const { authenticated, loading: loadingAuth } = useUserAuth()

  const fetchCategory = useCallback(async () => {
    setLoading(true)
    const response = await getCategories()
    if (response?.success) setCategories(response?.categories || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchCategory()
  }, [fetchCategory])

  // useEffect(() => {
  //   if (!authenticated && !loadingAuth) push('/')
  // }, [authenticated, loadingAuth, push])

  return (
    <SubscriptionProvider>
      <Layout>
        <PageContainer horizontalPad={theme.spacing.l}>
          {loading || loadingAuth ? (
            <CircleLoading />
          ) : (
            <>
              <PageTitle title={'INSCRIÇÃO'} weight="normal" onBack={() => push('/')} />
              {authenticated ? (
                <>
                  <SubscriptionLoader>
                    <br />
                    <SelectSubscriptionCategory categories={categories} />
                    <br />
                    <Divider />
                    <UserSubscriptions categories={categories} />
                    <br />
                    <Divider />
                    <SaveSubscription />
                    <br />
                  </SubscriptionLoader>
                </>
              ) : (
                <>
                  <FlexContainer verticalPad={20} justify="center">
                    <div>
                      <Paragraph align="center">Você precisa estar logado para fazer inscrição</Paragraph>
                    </div>
                  </FlexContainer>
                  <FlexContainer verticalPad={20} justify="center">
                    <ButtonGoogle />
                  </FlexContainer>
                  <FlexContainer verticalPad={20} justify="center">
                    <Button variant="outlined" onClick={() => push('/')}>
                      Página principal
                    </Button>
                  </FlexContainer>
                </>
              )}
            </>
          )}
        </PageContainer>
      </Layout>
    </SubscriptionProvider>
  )
}

export default SubscriptionPage
