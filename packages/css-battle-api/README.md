# CSS Battle API

[![](https://img.shields.io/badge/author-Edixon_Piña-green?style=for-the-badge)](https://edixonalberto.com)
[![](https://img.shields.io/npm/v/@edixon/css-battle-api?color=CB0000&style=for-the-badge)](https://npmjs.com/package/@edixon/css-battle-api)
[![](https://img.shields.io/npm/dt/@edixon/css-battle-api?color=8956FF&style=for-the-badge)](https://npmjs.com/package/@edixon/css-battle-api)

[![](https://img.shields.io/badge/types-TypeScript-blue?style=for-the-badge)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

First API client to get **public** information from the
[CSS Battle](https://cssbattle.dev) page. Created with NodeJS and Typescript, all types
are exposed for use. &nbsp;
<img src="https://github.com/EdixonAlberto/monorepo-css-battle/raw/main/.github/img/typescript.png" width="20px" alt="Logo typescript" /> +
💗

> 📃 **NOTE:** For now can only get the profile information of users, but later methods
> will be created to obtain: "leader board", "battle targets", etc.

> ⚠️ **WARN:** Currently the api cannot be consumed from the frontend due to CORS
> problems, but you can safely use it in a server environment for your backend
> applications.

## Installation

- NPM

```sh
npm install @edixon/css-battle-api
```

- CDN

⚠️ To be use of this bundle you must make use a proxy, soon this option will be added to
the api itself.

```html
<!-- Bundle to development -->
<script src="https://cdn.jsdelivr.net/npm/@edixon/css-battle-api@0.2.8/dist/bundle/CSSBattleAPI.js"></script>

<!-- Bundle optimized to production -->
Change "CSSBattleAPI.js" for "CSSBattleAPI.min.js" to use the version minified
```

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

## Contributing

See
[CONTRIBUTING.md](https://github.com/EdixonAlberto/css-battle/blob/main/CONTRIBUTING.md)

## License

[MIT](https://github.com/EdixonAlberto/css-battle/blob/main/LICENSE) &copy; Edixon Piña
