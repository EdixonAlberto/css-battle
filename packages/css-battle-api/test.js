const { CSSBattleClass } = require('./dist')

const CSSBattleAPI = new CSSBattleClass({
  proxy: false
})

CSSBattleAPI.profile('edixon').then(profile => {
  console.log(profile)
})
