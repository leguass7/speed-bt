import type { User } from '@prisma/client'

import type { IColumnTable } from '~/components/CustomTable'

import { AvatarCell, ContactCell, CpfCell, NameLinkCell } from './Cells'

export const columns: IColumnTable<User>[] = [
  { name: 'image', label: 'Foto', Cell: AvatarCell, align: 'center' },
  { name: 'name', label: 'Nome', Cell: NameLinkCell },
  { name: 'email', label: 'Contato', Cell: ContactCell },
  { name: 'cpf', label: 'CPF', Cell: CpfCell },
  { name: 'shirtSize', label: 'Camisa', align: 'center' }
]
