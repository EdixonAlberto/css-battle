export type TProfile = {
  avatar: string
  name: string
  username: string
  job: string | null
  country: string | null
  networks: TNetworks
  ranking: TRanking
}

export type TNetworks = {
  website: string | null
  github: string | null
  twitter: string | null
  codepen: string | null
} | null

export type TRanking = {
  rank: number
  totalPlayers: number
  totalScore: number
  battlesPlayed: number
}
