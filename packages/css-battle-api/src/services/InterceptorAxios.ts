import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

class InterceptorAxios {
  private readonly URL_BASE_DEFAULT = 'https://cssbattle.dev'
  private readonly URL_PROXY_DEFAULT = 'http://localhost:5000/'

  constructor(proxy: TProxy = false, private baseUrl?: string) {
    // Proxy in false by default
    this.baseUrl = this.getUrl(proxy, baseUrl)
    axios.defaults.timeout = 1_000 * 5
    this.interceptorsInit()
  }

  private getUrl(proxy: TProxy, _baseUrl?: string): string {
    let url: string = ''
    const baseUrl = _baseUrl || this.URL_BASE_DEFAULT

    if (typeof proxy === 'string') url = proxy + baseUrl
    else url = proxy ? this.URL_PROXY_DEFAULT + baseUrl : baseUrl

    return url
  }

  private interceptorsInit(): void {
    // REQUEST
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.baseURL = this.baseUrl
        config.headers.common['Content-Type'] = 'application/json'
        console.table([config.baseURL, config.url])

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

export { InterceptorAxios }
