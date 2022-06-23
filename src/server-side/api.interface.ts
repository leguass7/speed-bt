export interface IResponseApi {
  success?: boolean
  message?: string | string[]
}

export interface QueryPagination {
  page?: number
  size?: number
  order?: string
  orderby?: string
  search?: string
}

export interface IResponsePaginated<T = any> extends IResponseApi {
  total: number
  size: number
  page: number
  data: T[]
}
