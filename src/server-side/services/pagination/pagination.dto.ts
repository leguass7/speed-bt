export type PaginationOrder = 'asc' | 'desc'

export class PaginationQueryDto {
  page?: number
  size?: number
  orderBy?: string
  order?: PaginationOrder
}

export interface PaginationDetailDto {
  total: number
  pages: number
  page: number
}

export interface PaginationDto<T extends Record<string, any>> extends PaginationDetailDto {
  data: T[]
}
