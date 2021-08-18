const { CSSBattleAPI } = require('./dist')

CSSBattleAPI.profile('edixon').then(profile => {
  console.log(profile)
})
