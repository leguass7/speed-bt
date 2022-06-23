import type { NextApiResponse } from 'next'

// import type { Prisma as PrismaTypes } from '.prisma/client'

import type { AuthorizedApiRequest } from '~/server-side/auth/auth-protect.middleware'
import { PaginationQueryDto } from '~/server-side/services/pagination/pagination.dto'
import type { IUserService } from '~/server-side/users'

function paginate(userService: IUserService) {
  return async (req: AuthorizedApiRequest, res: NextApiResponse) => {
    const { ...pagination } = req?.query as PaginationQueryDto
    const data = await userService.paginate(pagination)
    return res.status(200).send({ success: true, ...data })
  }
}

export function factoryAdminUserController(userService: IUserService) {
  return {
    paginate: paginate(userService)
  }
}
