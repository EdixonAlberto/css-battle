import express, { Response } from 'express'
import { CSSBattleAPI } from '@edixon/css-battle-api'
import badges from './badges.json'

enum Styles {
  flat = 'flat',
  flatBig = 'flat-big',
  leader = 'leader'
}

const app = express()
const CSSBattle = new CSSBattleAPI()
const PORT = process.env.PORT || 5001

// OPTIONS
// TODO: Implementar libreria para rate limit request
app.set('view engine', 'ejs')

// ROUTE
app.get('/', async (req, res: Response) => {
  const { username, style } = req.query as TQuery

  if (username) {
    try {
      const { ranking } = await CSSBattle.profile(username)

      const badge = badges[ranking.rank]
      const rank = `${badge.name} / ${ranking.totalPlayers}`
      const score = ranking.totalScore.toFixed(2)
      const data = { rank, score, badge }

      // Styles
      if (style && Styles[style]) {
        res.header('Content-Type', 'image/svg+xml')
        res.render(style, data)
      } else {
        res.header('Content-Type', 'text/html')
        res
          .status(404)
          .send(
            'Style not found, these are the available ones: ' +
              '"flat" | "flat-big" | "leader"'
          )
      }
    } catch (error) {
      res.status(500).send(error)
    }
  } else {
    // TODO: cambiar msj de respuesta y mostrar un template de todos los querys quizas ?
    res.status(404).send('Parameter "username" required')
  }
})

// START
app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT)
})
