type TMetadata = {
  props: {
    pageProps: {
      player: TPlayer
    }
    __N_SSP: boolean
  }
  page: string
  query: {
    username: string
  }
  buildId: string
  assetPrefix: string
  isFallback: boolean
  gssp: boolean
  scriptLoader: Array<any>
}

type TPlayer = {
  id: string
  whatYouDo?: string
  userId: string
  isAvailableForHire: boolean
  links?: import('../types').TNetworks
  avatar: string
  isPro: boolean
  username: string
  country?: string
  settings: {
    emailNotifications: boolean
    theme: string
  }
  displayName: string
}

type TRank = {
  rank: number
  playedCount: number
  totalPlayers: number
  score: number
}
