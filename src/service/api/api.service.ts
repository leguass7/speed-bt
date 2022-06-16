import { querystring } from '~/helpers/string'

type ApiOptions = {
  baseUrl?: string
}
type METHOD = 'POST' | 'GET' | 'PATCH' | 'DELETE'

type RequestParams = {
  params?: Record<string, any>
}

export function normalizeUrl(path?: string, queryParams: any = {}): string {
  const [base = '', query = ''] = `${path}`.split('?')
  const params: any = querystring(query)
  return [base.replace(/^(.*)\/$/, '$1'), querystring({ ...params, ...queryParams })].join('?')
}

export class ApiService {
  constructor(private readonly options: ApiOptions) {}

  async fetcher(method: METHOD, url: string, data?: object) {
    try {
      const response = await fetch(`${this.options.baseUrl}${url}`, {
        body: data ? JSON.stringify(data) : undefined,
        method,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
      }).then(res => res.json())
      return response
    } catch (error) {
      return { success: false, message: 'app offline' }
    }
  }

  async get(url: string, { params }: RequestParams = {}) {
    return this.fetcher('GET', normalizeUrl(url, params))
  }

  async patch(url: string, data: any, { params }: RequestParams = {}) {
    return this.fetcher('PATCH', normalizeUrl(url, params), data)
  }

  async post(url: string, data: any, { params }: RequestParams = {}) {
    return this.fetcher('POST', normalizeUrl(url, params), data)
  }

  async delete(url: string, { params }: RequestParams = {}) {
    return this.fetcher('DELETE', normalizeUrl(url, params))
  }
}

export const apiService = new ApiService({ baseUrl: '/api' })
