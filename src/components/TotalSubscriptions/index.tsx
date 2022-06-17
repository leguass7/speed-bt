import React, { useCallback, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import { IResponseDash } from '~/server-side/dashboard/dashboard.dto'
import { getDashboard } from '~/service/api/dashboard'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { useAppSocket } from '../SocketProvider'
import { Container, ChartContainer, ContainerLine, ContainerText } from './styles'

export const TotalSubscriptions: React.FC = () => {
  const { theme } = useAppTheme()

  const [data, setData] = useState<IResponseDash>({
    totalOnline: 1,
    totalUsers: 0,
    totalSubscriptions: 0
  })

  const updateData = useCallback((dash: Partial<IResponseDash>) => {
    setData(old => ({ ...old, ...dash }))
  }, [])

  const {} = useAppSocket({
    users: totalOnline => {
      updateData({ totalOnline })
    }
  })

  const fetchData = useCallback(async () => {
    const response = await getDashboard()
    if (response?.success) {
      updateData(response)
    }
  }, [updateData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const progressStyles = buildStyles({
    pathColor: theme.colors.primary,
    trailColor: theme.colors.text,
    textColor: theme.colors.primary,
    pathTransitionDuration: 2
  })

  return (
    <Container>
      <ContainerLine>
        <ChartContainer chartWidth={'120px'}>
          <CircularProgressbar value={data?.totalUsers} text={`${data?.totalUsers}`} styles={progressStyles} maxValue={232} />
        </ChartContainer>
        <ContainerText>
          <h2>Total de atletas cadastrados</h2>
          <p>Agora {`${data?.totalOnline}`} usuário(s) online</p>
        </ContainerText>
      </ContainerLine>
      <ContainerLine>
        <ChartContainer chartWidth={'120px'}>
          <CircularProgressbar value={data?.totalSubscriptions} text={`${data?.totalSubscriptions}`} styles={progressStyles} maxValue={116} />
        </ChartContainer>
        <ContainerText>
          <h2>Total de inscrições</h2>
        </ContainerText>
      </ContainerLine>
    </Container>
  )
}
