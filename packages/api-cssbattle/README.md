# Api CSS Battle

Client api to obtain _public_ information from the [CSS Battle](https://cssbattle.dev)
page

Created with NodeJS and Typescript, all types are exposed for use.
<img src="../../.github/img/typescript.png" width="17px" alt="Logo typescript" /> + 💗

## Installation

- NPM

```sh
npm install CSSbattleApi
```

- CDN

coming soon...

## Usage

```js
const { CSSbattleApi } = require('CSSbattleApi')

CSSbattleApi.profile('USERNAME').then(profile => {
  console.log(profile.ranking.totalScore) // Total score obtained in CSS Battle
})
```

Using typescript and async/await.

```ts
import { CSSbattleApi, TProfile, TRanking } from 'CSSbattleApi'

async function getRanking(username: string): Promise<TRanking> {
  try {
    const profile: TProfile = await CSSbattleApi.profile(username)

    return profile.ranking
  } catch (error) {
    console.error('ERROR ->', error.message)
    throw new Error(error)
  }
}
```

## Types

```ts
type TProfile = {
  avatar: string
  name: string
  username: string
  job: string | null
  country: string | null
  networks: TNetworks
  ranking: TRanking
}

type TNetworks = {
  website: string | null
  github: string | null
  twitter: string | null
  codepen: string | null
} | null

type TRanking = {
  rank: number
  totalPlayers: number
  totalScore: number
  battlesPlayed: number
}
```
