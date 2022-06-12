import { isCelebrateError } from 'celebrate'
import { NextApiResponse, NextApiRequest } from 'next'
import { Options } from 'next-connect'

// export interface ApiResponseErrorDto {
//   status?: number;
//   message: string | string[];
// }

export interface ApiErrorParam {
  status: number
  message: string | string[]
}

/** @type {TypeError} */
export default function ErrorApi(data: ApiErrorParam | string) {
  if (typeof data === 'string') return TypeError(JSON.stringify({ message: data }))
  return TypeError(JSON.stringify(data))
}

export function onErrorApi(error: any, req: NextApiRequest, res: NextApiResponse) {
  try {
    const result: ApiErrorParam = {
      status: 500,
      message: error?.message || 'Something went wrong ApiResponseErrorDto'
    }

    if (isCelebrateError(error)) {
      // console.error('\n', error?.stack || error);

      const messages = []
      error.details.forEach(err => {
        err.details.forEach(msg => {
          console.log('msg', msg) //eslint-disable-line no-console
          messages.push(msg.message)
        })
      })

      result.status = 400
      result.message = messages.length > 1 ? messages : messages[0]
    }

    // if (error instanceof BaseError) {
    //   result.message = { message: `${error.name}: ${error.message}` };
    //   // trata erro do sequelize
    // }

    // if (error instanceof HttpException) {
    //   result.status = error?.status || 500
    //   result.message = error.message || 'Something went wrong HttpException'
    // }

    // if (error instanceof NotBeforeError || error instanceof JsonWebTokenError || error instanceof TokenExpiredError) {
    //   result.status = 401
    //   result.message = error.message || 'Token inválido'
    // }

    // logError('errorMiddleware', result?.status, result?.message)
    // console.error('\n', error?.stack, error)
    // console.log('Erro não identificado');

    return res.status(result?.status || 500).json(result)
  } catch (error) {
    return res.status(500).json({ success: false, message: error?.message || 'catch unexpected error' })
  }
}

export const ncConfig: Options<NextApiRequest, NextApiResponse> = {
  onError: onErrorApi
}
