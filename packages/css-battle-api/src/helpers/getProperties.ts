import axios, { AxiosResponse } from 'axios'
import { TNetworks, TRanking } from '../types'
import { ENetworks } from '../entities/enumerations'

export function getNetworks(links?: TLink): TNetworks | null {
  if (links) {
    let networks = {} as TNetworks

    for (const domain in ENetworks) {
      const username = links[domain as ENetworks] || null

      const link =
        domain === ENetworks.website
          ? username
          : username
          ? `https://${domain}.com/${username}`
          : null

      networks[domain as ENetworks] = link
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
