const { CSSBattleAPI } = require('./dist')

async function test() {
  try {
    const CSSBattle = new CSSBattleAPI()
    const profile = await CSSBattle.profile('edixon')

    console.log(profile)
  } catch (error) {
    console.error(error)
  }
}

test()
