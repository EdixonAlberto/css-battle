import axios, { AxiosResponse } from 'axios'
import { TNetworks, TRanking } from '../types'

export function getNetworks(links: any = null): TNetworks | null {
  if (links) {
    const urlWrapper = (domain: string): string | null => {
      if (links[domain]) return `https://${domain}.com/${links[domain]}`
      else return null
    }

    const networks: TNetworks = {
      website: links['website'] || null,
      github: urlWrapper('github'),
      twitter: urlWrapper('twitter'),
      codepen: urlWrapper('codepen')
    }

    return networks
  } else return null
}

export async function getRanking(userId: string): Promise<TRanking> {
  try {
    const { status, data }: AxiosResponse<TRank> = await axios.get(
      `https://cssbattle.dev/api/getRank?userId=${userId}`
    )

    if (status === 200) {
      return {
        rank: data.rank,
        totalPlayers: data.totalPlayers,
        totalScore: data.score,
        battlesPlayed: data.playedCount
      }
    } else throw new Error('ERROR-REQUEST-GET-RANK')
  } catch (error) {
    console.error('ERROR-GET-RANKING', error.message)
    throw new Error(error)
  }
}
