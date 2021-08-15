# Api CSS Battle

This es a client api to obtain _public_ information from the
[CSS Battle](https://cssbattle.dev) page

Created with NodeJS and Typescript, all types are exposed for use.
<img src="../../.github/img/typescript.png" width="17px" alt="Logo typescript" /> + 💗

## Installation

in progress...

## Usage

in progress...

## Types

```ts
type profile = {
  name: string
  username: string
  image: string
  country: string
  networks: {
    web: string
    github: string
    twitter: string
    codepen: string
  }
  globalRank: string
  totalScore: number
  targetsPlayed: string
}
```
