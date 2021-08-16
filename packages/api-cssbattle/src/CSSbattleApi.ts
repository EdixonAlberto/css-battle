import { CheerioWrapper } from './modules/CheerioWrapper'
import { getNetworks, getRanking } from './helpers/getProperties'
import { TNetworks, TProfile, TRanking } from './types'

const cheerioWrapper = new CheerioWrapper('https://cssbattle.dev')

class CSSbattleApi {
  public static async profile(username: string): Promise<TProfile | null> {
    try {
      const $ = await cheerioWrapper.load(`/player/${username}`)

      if ($) {
        // User info
        const nextData: string = $('#__NEXT_DATA__').get()[0].children[0].data
        const metaData: TMetadata = JSON.parse(nextData)
        const player: TPlayer = metaData.props.pageProps.player
        const networks: TNetworks = getNetworks(player.links)

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
      } else return null
    } catch (error) {
      console.error('ERROR-API ->', error.message)
      return null
    }
  }
}

export { CSSbattleApi }
