import corsAnywhere from 'cors-anywhere'

const CORS_PROXY_PORT = 5000

// CORS Anywhere
corsAnywhere
  .createServer()
  .listen(CORS_PROXY_PORT, () =>
    console.log(`>> CORS Anywhere server in port: ${CORS_PROXY_PORT}`)
  )
