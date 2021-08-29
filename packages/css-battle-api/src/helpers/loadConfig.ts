export function loadConfig() {
  const config: TConfig = {
    urlBase: 'https://cssbattle.dev',
    urlProxy: 'https://css-battle-proxy.herokuapp.com/'
  }

  global.config = config
}
