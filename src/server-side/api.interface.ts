import type { NextApiRequest, NextApiResponse } from 'next'
import type { RequestHandler } from 'next-connect'

export interface IResponseApi {
  success?: boolean
  message?: string | string[]
}

export type Controller = Record<string, RequestHandler<NextApiRequest, NextApiResponse>>
