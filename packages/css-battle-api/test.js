const { CSSBattleAPI } = require('./dist')

const CSSBattle = new CSSBattleAPI({
  proxy: false
})

CSSBattle.profile('edixon').then(profile => {
  console.log(profile)
})
