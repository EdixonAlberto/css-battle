import axios from 'axios'
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
  const { data }: TResponseOK<TRank> = await axios.get(`/api/getRank?userId=${userId}`)

  if (data) {
    return {
      rank: data.rank,
      totalPlayers: data.totalPlayers,
      totalScore: data.score,
      battlesPlayed: data.playedCount
    }
  } else throw 'Could not get user ranking'
}
