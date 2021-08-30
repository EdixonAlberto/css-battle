export function loadConfig() {
  const config: TConfig = {
    modeDev: process.env.NODE_ENV === 'development',
    urlBase: 'https://cssbattle.dev',
    urlProxy: 'https://css-battle-proxy.herokuapp.com'
  }

  global.config = config
}
