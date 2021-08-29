type TConfig = {
  urlBase: string
  urlProxy: string
}

type TProxy = import('../types').TConfig['proxy']

/************************************ DECLARATIONS **************************************/

declare var config: TConfig
