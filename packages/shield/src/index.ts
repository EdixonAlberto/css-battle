import express, { Response } from 'express'

const app = express()
const port = 5001

app.set('view engine', 'ejs')

app.get('/', (req, res: Response) => {
  res.header('Content-Type', 'image/svg+xml')
  res.render('index')
})

app.listen(port, () => {
  console.log('Server listening on port: ', port)
})
