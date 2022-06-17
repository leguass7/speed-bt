import React, { useCallback, useEffect, useState } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import { IResponseDash } from '~/server-side/dashboard/dashboard.dto'
import { getDashboard } from '~/service/api/dashboard'

import { useAppTheme } from '../AppThemeProvider/useAppTheme'
import { Title } from '../styled'
import { Container, ChartContainer } from './styles'

export const TotalSubscriptions: React.FC = () => {
  const { theme } = useAppTheme()
  const [data, setData] = useState<IResponseDash>({
    totalUsers: 0
  })

  const progressStyles = buildStyles({
    pathColor: theme.colors.primary,
    trailColor: theme.colors.text,
    textColor: theme.colors.primary,
    pathTransitionDuration: 2
  })

  const fetchData = useCallback(async () => {
    const response = await getDashboard()
    if (response?.success) {
      setData(response)
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <Container>
      <div>
        <Title textColor={theme.colors.primary}>Total de atletas cadastrados</Title>
      </div>
      <ChartContainer chartWidth={'120px'}>
        <CircularProgressbar value={data?.totalUsers} text={`${data?.totalUsers}`} styles={progressStyles} maxValue={500} minValue={0} />
      </ChartContainer>
    </Container>
  )
}
