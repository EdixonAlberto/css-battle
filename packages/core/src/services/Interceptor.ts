import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

class Interceptor {
  private baseUrl: string

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || 'https://cssbattle.dev'
    axios.defaults.timeout = 1000 * 30
    this.interceptorsInit()
  }

  private interceptorsInit(): void {
    // REQUESTS
    axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.baseURL = this.baseUrl
        config.headers.common['Content-Type'] = 'application/json'
        return config
      },
      (error: AxiosError) => {
        console.error('ERROR-RESPONSE-AXIOS ->', error.message)
        return null
      }
    )

    // RESPONSES
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
