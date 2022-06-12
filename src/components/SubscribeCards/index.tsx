import React from 'react'

import { formatPrice } from '~/helpers'

import { VariantColorsTypes } from '../AppThemeProvider/types'
import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { Container, CardItem, CardContainer, Price } from './styled'

// 50+
// Iniciante
// Intermediária
// Open

type Props = {
  themeColor?: VariantColorsTypes
}
export const SubscribeCards: React.FC<Props> = ({ themeColor = 'secondary' }) => {
  const { theme, matchingBackgroudText } = useAppTheme()

  return (
    <Container bgColor={theme.colors[themeColor]} textColor={matchingBackgroudText(themeColor)}>
      <CardItem>
        <CardContainer>
          <h2>50+</h2>
          <Price>{formatPrice(80)}</Price>
        </CardContainer>
      </CardItem>
      <CardItem>
        <CardContainer>
          <h2>Iniciante</h2>
          <Price>{formatPrice(80)}</Price>
        </CardContainer>
      </CardItem>
      <CardItem>
        <CardContainer>
          <h2>Intermediária</h2>
          <Price>{formatPrice(80)}</Price>
        </CardContainer>
      </CardItem>
      <CardItem>
        <CardContainer>
          <h2>Open</h2>
          <Price>{formatPrice(80)}</Price>
        </CardContainer>
      </CardItem>
    </Container>
  )
}
