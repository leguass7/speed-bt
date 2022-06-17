import { useState } from 'react'

import { Stack } from '@mui/material'
import { NextPage } from 'next'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import { FormRegister } from '~/components/FormRegister'
import { LogoSvg } from '~/components/images/LogoSvg'
import { Layout } from '~/components/Layout'
import { PageTitle } from '~/components/PageTitle'
import { PageContainer } from '~/components/styled'

const LinkGoogle = styled.button`
  display: inline-block;
  background-color: transparent;
  font-family: 'Gilroy';
  border: 1px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  padding: ${({ theme }) => `${theme.spacing.m}px ${theme.spacing.l}px`};
  border-radius: ${({ theme }) => theme.spacing.m}px;
  cursor: pointer;
`

const RegisterPage: NextPage = () => {
  const { status } = useSession()
  const [loading, setLoading] = useState(false)
  const { push } = useRouter()

  const loginGoogle = async () => {
    if (status === 'unauthenticated') {
      setLoading(true)
      await signIn('google')
      setLoading(false)
    }
  }

  return (
    <Layout>
      <Stack direction={'row'} justifyContent="center" spacing={1} sx={{ marginTop: 2, marginBottom: 2 }}>
        <LogoSvg width={200} />
      </Stack>

      <PageContainer>
        <PageTitle weight="normal" onBack={() => push('/')}>
          <h1>CADASTRO</h1>
          {status === 'unauthenticated' ? <LinkGoogle onClick={loginGoogle}>{loading ? '...aguarde' : 'usar conta do google'}</LinkGoogle> : null}
        </PageTitle>
        <FormRegister onCancel={() => push('/')} />
        <br />
        <br />
      </PageContainer>
    </Layout>
  )
}

export default RegisterPage
