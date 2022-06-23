import { Prisma } from '.prisma/client'

import camelcase from 'camelcase'

import prisma from '~/server-side/database'

import { PaginationDto, PaginationQueryDto } from './pagination.dto'

interface Props extends PaginationQueryDto {
  model: Prisma.ModelName
  size?: number
  page?: number
  orderby?: string
  order?: 'asc' | 'desc'
  include?: any
  select?: any
  where?: any
}

async function paginate<T = unknown>({ model, size = 25, page = 1, orderby, order, select, include, where }: Props): Promise<PaginationDto<T>> {
  // @ts-ignore
  const prismaModel = prisma[camelcase(model)]
  const totalCount = await prismaModel.count({ where: { ...where } })

  if (!totalCount) return { total: 0, pages: 0, page, data: [] }

  let findManyArgs = {}
  if (where) findManyArgs = { ...findManyArgs, where: { ...where } }
  if (size) {
    const skip = size * (page - 1) || undefined
    // console.log('skip', skip);
    findManyArgs = { ...findManyArgs, take: size, skip }
  }
  if (orderby) findManyArgs = { ...findManyArgs, orderBy: { [orderby]: order } }

  if (include) findManyArgs = { ...findManyArgs, include: include }

  const pages = Math.ceil(totalCount / size)

  try {
    const results = await prismaModel.findMany({
      ...findManyArgs,
      select,
      take: size
    })
    return {
      total: totalCount,
      page,
      pages,
      data: results
    }
  } catch (error) {
    // console.log(error)
    return {
      total: 0,
      page,
      pages,
      data: []
    }
  }
}

export const PaginationService = {
  paginate
}

export type IPaginationService = typeof PaginationService
