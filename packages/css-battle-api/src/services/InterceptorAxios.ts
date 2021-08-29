import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { createErrorMsg } from '../helpers/createErrorMsg'

class InterceptorAxios {
  private readonly URL_BASE_DEFAULT = global.config.urlBase
  private readonly URL_PROXY_DEFAULT = global.config.urlProxy

  constructor(proxy?: TProxy, private baseUrl?: string) {
    // Proxy in false by default
    this.baseUrl = this.getUrl(proxy, baseUrl)
    axios.defaults.timeout = 1_000 * 10
    this.interceptorsInit()
  }

  // TODO: Usar un helper para crear la URL y en este verificar la estructura URI del proxy
  private getUrl(proxy: TProxy = false, _baseUrl?: string): string {
    let url: string = ''
    const baseUrl: string = _baseUrl || this.URL_BASE_DEFAULT
    // format custom proxy
    const removeSlash = (urlSlash: string): string => {
      const len: number = urlSlash.length - 1

      if (urlSlash[len] === '/') {
        const _urlSlash = urlSlash.substr(0, len)
        return removeSlash(_urlSlash)
      } else return urlSlash
    }

    if (typeof proxy === 'string') {
      const customProxy: string = removeSlash(proxy)
      url = `${customProxy}/${baseUrl}`
    } else url = proxy ? `${this.URL_PROXY_DEFAULT}/${baseUrl}` : baseUrl

    return url
  }

  private interceptorsInit(): void {
    // REQUEST
    axios.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        config.baseURL = this.baseUrl
        config.headers.common['Content-Type'] = 'application/json'
        if (global.config.modeDev) {
          console.log(createErrorMsg('LOG-REQUEST', `${config.baseURL}/${config.url}`))
        }
        return config
      },
      (error: AxiosError) => {
        // TODO: Evitar exponer los errores de axios, mostrarlos solo en desarrollo
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
        // TODO: Evitar exponer los errores de axios, mostrarlos solo en desarrollo
        if (global.config.modeDev) {
          console.error(createErrorMsg('ERROR-RESPONSE-AXIOS', error))
        }
        return { data: null }
      }
    )
  }
}

export { InterceptorAxios }
