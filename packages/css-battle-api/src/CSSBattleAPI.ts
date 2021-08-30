import { InterceptorAxios } from './services/InterceptorAxios'
import { loadCheerio } from './helpers/loadCheerio'
import { getNetworks, getRanking } from './helpers/getProperties'
import { loadConfig } from './helpers/loadConfig'
import { createErrorMsg } from './helpers/createErrorMsg'
import { TNetworks, TProfile, TRanking, TConfig } from './types'

class CSSBattleAPI {
  constructor(config?: TConfig) {
    try {
      loadConfig()
      new InterceptorAxios(config?.proxy)
    } catch (error) {
      throw createErrorMsg('ERROR-CONFIG', error.message)
    }
  }

  public async profile(username: string): Promise<TProfile> {
    try {
      const $ = await loadCheerio(`/player/${username}`)

      // User info
      const nextData: string = $('#__NEXT_DATA__').get()[0].children[0].data
      const metaData: TMetadata = JSON.parse(nextData)
      const player: TPlayer = metaData.props.pageProps.player

      if (player.username) {
        const networks: TNetworks | null = getNetworks(player.links)

        // Achievements
        const ranking: TRanking = await getRanking(player.id)

        const profile: TProfile = {
          avatar: player.avatar,
          name: player.displayName,
          username: player.username,
          country: player.country || null,
          job: player.whatYouDo || null,
          networks,
          ranking
        }

        return profile
      } else throw 'User profile does not exist'
    } catch (errorMessage) {
      throw createErrorMsg('ERROR-API', errorMessage)
    }
  }
}

export { CSSBattleAPI }
