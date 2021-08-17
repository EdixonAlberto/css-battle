# CSS Battle API

[![](https://img.shields.io/badge/author-Edixon_Piña-blue.svg?&style=for-the-badge)](https://edixonalberto.com)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

Client api to obtain _public_ information from the [CSS Battle](https://cssbattle.dev)
page.

Created with NodeJS and Typescript, all types are exposed for use.
<img src="../../.github/img/typescript.png" width="17px" alt="Logo typescript" /> + 💗

> **Nota:** For now can only get the profile information of users, but later methods will
> be created to obtain: "leader board", "battle targets", etc.

## Installation

- NPM

```sh
npm install @edixon/css-battle-api
```

- CDN

coming soon...

## Usage

```js
const { CSSBattleAPI } = require('@edixon/css-battle-api')

CSSBattleAPI.profile('USERNAME').then(profile => {
  console.log(profile.ranking.totalScore) // Total score obtained in CSS Battle
})
```

Using typescript and async/await.

```ts
import { CSSBattleAPI, TRanking } from '@edixon/css-battle-api'

async function getRanking(username: string): Promise<TRanking | null> {
  try {
    const profile = await CSSBattleAPI.profile(username)

    return profile?.ranking || null
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

## License

MIT &copy; [Edixon Piña](https://github.com/EdixonAlberto)
