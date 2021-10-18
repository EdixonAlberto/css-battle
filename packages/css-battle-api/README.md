# CSS Battle API

[![](https://img.shields.io/badge/author-Edixon_Piña-green?style=for-the-badge)](https://edixonalberto.com)
[![](https://img.shields.io/npm/v/@edixon/css-battle-api?color=CB0000&style=for-the-badge)](https://npmjs.com/package/@edixon/css-battle-api)
[![](https://img.shields.io/npm/dt/@edixon/css-battle-api?color=8956FF&style=for-the-badge)](https://npmjs.com/package/@edixon/css-battle-api)

[![](https://img.shields.io/badge/types-TypeScript-blue?style=for-the-badge)](https://github.com/microsoft/TypeScript)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

First API client to get **public** information from the
[CSS Battle](https://cssbattle.dev) page. Created with NodeJS and Typescript, all types
are exposed for use. &nbsp;
<img src="https://github.com/EdixonAlberto/monorepo-css-battle/raw/main/.github/img/typescript.png" width="20px" alt="Logo typescript" /> +
💗

> 📃 **NOTE:** For now can only get the profile information of users, but later methods
> will be created to obtain: "leader board", "battle targets", etc.

> 📃 **NOTE:** To be able to use api from a frontend app, you must use a proxy, the
> library comes with one by default, it is on a free server so don't expect quick results.

## Installation

- NPM

```sh
npm install @edixon/css-battle-api
```

- CDN

```html
<!-- Bundle optimized to production -->
<script src="https://cdn.jsdelivr.net/npm/@edixon/css-battle-api@0.7.3/dist/bundle/CSSBattleAPI.min.js"></script>
```

## Usage

We require the library and we get the `CSSBattleAPI` class, then we create an instance to
use the query methods.

```js
const { CSSBattleAPI } = require('@edixon/css-battle-api')

const CBA = new CSSBattleAPI()

CBA.profile('USERNAME').then(profile => {
  console.log(profile.ranking.totalScore) // Total score obtained in CSS Battle
})
```

You can also pass a configuration object to the class to set a proxy and be able to use of
the client side api. Can enter a `URL` or `true` to use the default proxy.

```js
const CBA = new CSSBattleAPI({
  proxy: /* boolean | string */
})
```

Using typescript, async/await and try/catch.

When an error occurs a string `error` is returned, is a friendly message that describe the
cause of the error in the query.

```ts
import { CSSBattleAPI, TRanking } from '@edixon/css-battle-api'

async function getRanking(username: string): Promise<TRanking> {
  try {
    const { ranking } = await new CSSBattleAPI().profile(username)

    return ranking
  } catch (error) {
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
