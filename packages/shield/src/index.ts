import express, { Response } from 'express'
import { CSSBattleAPI } from '@edixon/css-battle-api'
import badges from './badges.json'

const app = express()
const CSSBattle = new CSSBattleAPI()
const PORT = process.env.PORT || 5001

// TODO: Crear clase server y agregar middlewares
app.set('view engine', 'ejs')

app.get('/', async (req, res: Response) => {
  const { username, style, size } = req.query as TQuery

  if (username) {
    const { ranking } = await CSSBattle.profile(username)

    const badge = badges[ranking.rank]
    const rank = `${badge.name} / ${ranking.totalPlayers}`
    const score = ranking.totalScore.toFixed(2)
    const data = { rank, score, badge }

    // TODO: Implementar libreria para rate limit request
    res.header('Content-Type', 'image/svg+xml')

    // Styles
    switch (style) {
      case 'leader':
        res.render('leader', data)
        break

      case 'flat':
        res.render('flat', data)
        break

      default:
        // TODO: cambiar style default por un estilo basic
        res.render('leader', data)
        break
    }
  } else {
    // TODO: cambiar msj de respuesta y mostrar un template de todos los querys quizas ?
    res.status(404).send('username required')
  }
})

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT)
})
