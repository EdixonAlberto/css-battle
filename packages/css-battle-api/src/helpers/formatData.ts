export function getUrl(proxy: TProxy = false): string {
  const URL_BASE_DEFAULT = global.config.urlBase
  const URL_PROXY_DEFAULT = global.config.urlProxy
  let url: string = ''

  if (typeof proxy === 'string') {
    // format proxy
    const formattedProxy: string = new URL('/', proxy).href

    url = formattedProxy + URL_BASE_DEFAULT
  } else url = proxy ? `${URL_PROXY_DEFAULT}/${URL_BASE_DEFAULT}` : URL_BASE_DEFAULT

  return url
}
