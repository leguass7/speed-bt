import { IResponseApi } from '../api.interface'

export type ICategory = {
  id: number
  name: string
  label: string
  price: number
}

export interface IResponseCategory extends IResponseApi {
  categoryId?: number
  caretegory?: ICategory
}

export interface IResponseCategories extends IResponseApi {
  categories?: ICategory[]
}
