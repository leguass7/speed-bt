type ApiOptions = {
  baseUrl?: string
}
type METHOD = 'POST' | 'GET' | 'PATCH' | 'DELETE'
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

  async get(url: string) {
    return this.fetcher('GET', url)
  }

  async patch(url: string, data: any) {
    return this.fetcher('PATCH', url, data)
  }

  async post(url: string, data: any) {
    return this.fetcher('POST', url, data)
  }
}

export const apiService = new ApiService({ baseUrl: '/api' })
