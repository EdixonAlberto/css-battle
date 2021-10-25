import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { createErrorMsg, getUrl } from '../helpers'

class InterceptorAxios {
  constructor(proxy?: TProxy, private baseUrl: string = '') {
    // Proxy in false by default
    this.baseUrl = getUrl(proxy)
    axios.defaults.timeout = 1_000 * 60
    this.interceptorsInit()
  }

  private interceptorsInit(): void {
    // REQUEST
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.baseURL = this.baseUrl
        config.headers.common['Content-Type'] = 'application/json'
        if (global.config.modeDev) {
          console.log(createErrorMsg('LOG-REQUEST', config.baseURL + config.url))
        }
        return config
      },
      (error: AxiosError) => {
        if (global.config.modeDev) {
          console.error(createErrorMsg('ERROR-REQUEST-AXIOS', error))
        }
        return { data: null }
      }
    )

    // RESPONSE
    axios.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (global.config.modeDev) {
          console.error(createErrorMsg('ERROR-RESPONSE-AXIOS', error))
        }
        return { data: null }
      }
    )
  }
}

export { InterceptorAxios }
