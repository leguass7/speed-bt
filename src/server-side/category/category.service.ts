import prisma from '~/server-side/database'

import { ICategory } from './category.dto'

// const mock: ICategory[] = [
//   { id: 1, name: 'Pro', label: 'Profissional', price: 80 },
//   { id: 2, name: 'A', label: 'Categoria A', price: 80 },
//   { id: 3, name: 'B', label: 'Categoria B', price: 80 },
//   { id: 4, name: 'C', label: 'Categoria C', price: 80 },
//   { id: 5, name: 'D', label: 'Iniciante', price: 80 }
//   //
// ]

export async function list(): Promise<ICategory[]> {
  const result = await prisma.category.findMany({ where: { tournamentId: 1, published: true } })
  return result as ICategory[]
}

export const CategoryService = {
  list
}

export type ICategoryService = typeof CategoryService
