import { CSSBattleAPI, TProfile } from '../dist'

describe('CSSBattleAPI', () => {
  const CBA = new CSSBattleAPI()

  test('Get Profile', async () => {
    try {
      const profile: TProfile = await CBA.profile('edixon')

      expect(profile).toMatchObject(<TProfile>{ job: 'Software Developer' })
    } catch (error) {
      console.error(error)
    }
  })
})
