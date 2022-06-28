import React from 'react'

import Avatar from '@mui/material/Avatar'
import type { User } from '@prisma/client'
import { cpf } from 'cpf-cnpj-validator'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { ICustomCellProps } from '~/components/CustomTable'
import { brighten } from '~/helpers/colors'
import { normalizeImageSrc, stringAvatar, stringToColor } from '~/helpers/string'

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

export const CpfCell: React.FC<Props> = ({ record }) => {
  const { theme } = useAppTheme()
  const isValidCpf = record?.cpf ? cpf.isValid(record?.cpf) : false
  return (
    <CellContainer>
      <P>
        {record?.cpf || '--'}
        {record?.cpf && !isValidCpf ? (
          <>
            <br />
            <Span textColor={theme.colors.errors}>cpf inválido</Span>
          </>
        ) : null}
      </P>
    </CellContainer>
  )
}

export const AvatarCell: React.FC<Props> = ({ record }) => {
  const sxColor = (name: string) => {
    return { bgcolor: brighten(stringToColor(name), 1) }
  }

  return (
    <CellContainer>
      <Avatar alt={record?.name} src={normalizeImageSrc(record?.image)} sx={sxColor(record?.name)}>
        {stringAvatar(record?.name)}
      </Avatar>
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
