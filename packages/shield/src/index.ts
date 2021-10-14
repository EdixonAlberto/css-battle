import express, { Request, Response, NextFunction } from 'express'
import ratelimit from 'express-rate-limit'
import { CSSBattleAPI } from '@edixon/css-battle-api'
import badges from './data/badges.json'
import { Styles } from './data/enumerations'

const app = express()
const CBA = new CSSBattleAPI()

// CONSTANTS
const PORT: number = Number(process.env.PORT) || 5001
const TIME_WINDOW = 20 // time in seconds

// OPTIONS
app.set('view engine', 'ejs')

// MIDDLEWARE
// Rate limit
app.use(
  ratelimit({
    windowMs: TIME_WINDOW * 1000, // time window to continue with the requests
    max: 2, // limit each IP to 2 requests per windowMs
    message: `Your limit exceeded, await ${TIME_WINDOW}s to continue` // message to display when max is exceeded
  })
)
// Handler query
app.use((req: Request, res: Response, next: NextFunction): void => {
  const { username, style } = req.query as TQuery

  if (username) {
    if (style && Styles[style]) next()
    else {
      res.header('Content-Type', 'text/html')
      res
        .status(404)
        .send(
          'Parameter "style" not found, these are the available ones: ' +
            '"flat" | "flat-big" | "leader"'
        )
    }
  } else {
    res.header('Content-Type', 'text/html')
    res.status(404).send('Parameter "username" required')
  }
})

// ROUTE
app.get('/', async (req: Request, res: Response): Promise<void> => {
  const { username, style } = req.query as TQuery

  try {
    const { ranking } = await CBA.profile(username)

    const badge = badges[ranking.rank]
    const rank = `${badge.name} / ${ranking.totalPlayers}`
    const score = ranking.totalScore.toFixed(2)
    const data = { rank, score, badge }

    res.header('Content-Type', 'image/svg+xml')
    res.render(style, data)
  } catch (error) {
    res.status(500).send(error)
  }
})

// START
app.listen(PORT, (): void => {
  console.log('>> (SHIELD) server listening on port:', PORT)
})
