import { useCallback, useEffect } from 'react'

import { Stack } from '@mui/material'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { FormForgot } from '~/components/FormForgot'
import { LogoSvg } from '~/components/images/LogoSvg'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { PageContainer } from '~/components/styled'

interface Props {
  key?: string
}

const Login: NextPage<Props> = () => {
  const { replace, push } = useRouter()
  const { status } = useSession()

  const checkLogged = useCallback(() => {
    if (status === 'authenticated') replace('/')
  }, [status, replace])

  useEffect(() => {
    checkLogged()
  }, [checkLogged])

  return (
    <Layout>
      <Stack direction={'row'} justifyContent="center" spacing={1} sx={{ marginTop: 2, marginBottom: 2 }}>
        <LogoSvg width={200} />
      </Stack>
      <PageContainer>
        <PageTitle title="Redefinir senha" weight="normal" onBack={() => push('/')} />
        <FormForgot />
      </PageContainer>
    </Layout>
  )
}

export default Login
