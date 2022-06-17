import React from 'react'

import Image from 'next/image'

import logo from '~/assets/logo.png'
import year2022 from '~/assets/year2022.png'
import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
// import { LogoSvg } from '~/components/images/LogoSvg'
import { SuperHeader, Title } from '~/components/styled'

import { Container, ImageContainer } from './styles'

export const TopHome: React.FC = () => {
  const { theme } = useAppTheme()
  return (
    <>
      <Container>
        <Image src={logo} alt="2022" />
        {/* <LogoSvg width={240} /> */}
        <ImageContainer>
          <Image src={year2022} alt="2022" />
        </ImageContainer>
        <SuperHeader textColor={theme.colors.primary}>
          1<sup>&ordf;</sup> RESENHA OPEN SPEED
        </SuperHeader>
        <br />
        <Title textColor={theme.colors.primary} textSize={36}>
          29 e 30 de julho
        </Title>
      </Container>
    </>
  )
}
