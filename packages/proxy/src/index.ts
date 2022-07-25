import express from 'express'
import proxy from 'express-http-proxy'

const CORS_PROXY_PORT: number = Number(process.env.PORT) || 5000
const APP_PORT = process.env.PORT || 8080

let app = express() // Proxy to CORS server

app.use(proxy(`localhost:${CORS_PROXY_PORT}`))

app.listen(APP_PORT, () => {
  console.log(`External CORS cache server started at port ${APP_PORT}`)
})
