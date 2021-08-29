const { CSSBattleAPI } = require('./dist')

const CSSBattle = new CSSBattleAPI({ proxy: true })

CSSBattle.profile('edixon')
  .then(profile => console.log(profile))
  .catch(error => console.error(error))
