import React from 'react'

import type { User } from '@prisma/client'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { ICustomCellProps } from '~/components/CustomTable'

import { CellContainer, Span, P } from './styled'

type Props = ICustomCellProps<User> & {}

export const ContactCell: React.FC<Props> = ({ record }) => {
  return (
    <CellContainer>
      <P>
        {record?.email}
        <br />
        <Span>{record?.phone || '--'}</Span>
      </P>
    </CellContainer>
  )
}

export const NameLinkCell: React.FC<Props> = ({ record }) => {
  const { theme } = useAppTheme()
  return (
    <CellContainer>
      <P linkColor={theme.colors.secondary}>{record?.name}</P>
    </CellContainer>
  )
}

// export const DateCell: React.FC<Props> = ({ record }) => {
//   const createdAt = record?.createdAt && parseJSON(record.createdAt)
//   const relative = createdAt ? formatRelative(createdAt, new Date(), { locale: ptBr, weekStartsOn: 1 }) : '--'
//   return (
//     <CellContainer>
//       <P>{relative}</P>
//     </CellContainer>
//   )
// }
