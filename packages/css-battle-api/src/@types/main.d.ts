type TConfig = {
  urlBase: string
  urlProxy: string
}

type TProxy = import('../types').TConfig['proxy']

type TResponseOK<T = any> = import('axios').AxiosResponse<T | null>

/************************************ DECLARATIONS **************************************/

declare var config: TConfig
