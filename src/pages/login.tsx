import { Stack } from '@mui/material'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { FormLogin } from '~/components/FormLogin'
import { LogoSvg } from '~/components/images/LogoSvg'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { PageContainer } from '~/components/styled'

const Login: NextPage = () => {
  const { push } = useRouter()

  return (
    <Layout>
      <Stack direction={'row'} justifyContent="center" spacing={1} sx={{ marginTop: 2, marginBottom: 2 }}>
        <LogoSvg width={200} />
      </Stack>
      <PageContainer>
        <PageTitle title="Login" weight="normal" onBack={() => push('/')} />
        <FormLogin />
      </PageContainer>
    </Layout>
  )
}

export default Login
