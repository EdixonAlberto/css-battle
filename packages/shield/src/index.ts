import express, { Response } from 'express'
import { CSSBattleAPI } from '@edixon/css-battle-api'
import badges from './badges.json'

const app = express()
const CSSBattle = new CSSBattleAPI()
const PORT = process.env.PORT || 5001

app.set('view engine', 'ejs')

app.get('/', async (req, res: Response) => {
  // TODO: obtener el username desde el query param
  const { ranking } = await CSSBattle.profile('edixon')

  const badge = badges[ranking.rank]
  const rank = `${badge.name} / ${ranking.totalPlayers}`
  const score = ranking.totalScore.toFixed(2)

  // TODO: implementar libreria para rate limit request
  res.header('Content-Type', 'image/svg+xml')
  res.render('index', { rank, score, badge })
})

app.listen(PORT, () => {
  console.log('Server listening on port: ', PORT)
})
