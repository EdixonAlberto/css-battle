const fs = require('fs/promises')
const { resolve } = require('path')
const browserify = require('browserify')
const { PATH_BASE, createHeaderMessage } = require('./helpers')

module.exports.createBundle = () => {
  const browserifyObject = browserify(resolve('tools', 'templateBundle.js'), {
    debug: true
  })

  browserifyObject.bundle(async (err, buffer) => {
    try {
      if (err) throw new Error(err)
      const code = `${createHeaderMessage()}\n${buffer}`

      await fs.mkdir(PATH_BASE)

      await fs.appendFile(resolve(PATH_BASE, 'CSSBattleAPI.js'), code, {
        encoding: 'utf8'
      })
    } catch (error) {
      console.error('ERROR-TASK-BUNDLE ->', error.message)
    }
  })
}
