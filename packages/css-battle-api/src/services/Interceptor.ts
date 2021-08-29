import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

class Interceptor {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || 'https://cssbattle.dev'
    axios.defaults.timeout = 1_000 * 5
    this.interceptorsInit()
  }

  private interceptorsInit(): void {
    // REQUEST
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.baseURL = this.baseUrl
        config.headers.common['Content-Type'] = 'application/json'
        return config
      },
      (error: AxiosError) => {
        console.error('ERROR-REQUEST-AXIOS ->', error.message)
        return null
      }
    )

    // RESPONSE
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        console.error('ERROR-RESPONSE-AXIOS ->', error.message)
        return { status: error.response?.status || 500, data: null }
      }
    )
  }
}

export { Interceptor }
