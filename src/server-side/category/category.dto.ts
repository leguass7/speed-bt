import { IResponseApi } from '../api.interface'

export type ICategory = {
  id: number
  tournamentId: number
  title: string
  description?: string
  price?: number
  published?: boolean
}

export interface IResponseCategory extends IResponseApi {
  categoryId?: number
  caretegory?: ICategory
}

export interface IResponseCategories extends IResponseApi {
  categories?: ICategory[]
}
