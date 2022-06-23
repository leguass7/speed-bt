import type { User } from '@prisma/client'

import type { IColumnTable } from '~/components/CustomTable'

import { ContactCell, NameLinkCell } from './Cells'

export const columns: IColumnTable<User>[] = [
  { name: 'name', label: 'Nome', Cell: NameLinkCell },
  { name: 'email', label: 'Contato', Cell: ContactCell },
  { name: 'cpf', label: 'CPF' },
  { name: 'shirtSize', label: 'Camisa' }
]
