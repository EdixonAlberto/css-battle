const fs = require('fs/promises')
const { resolve } = require('path')
const browserify = require('browserify')
const helpers = require('../tools/helpers')

module.exports.createBundle = async () => {
  const browserifyObject = browserify(resolve('tools', 'templateBundle.js'), {
    debug: true
  })

  return new Promise((resolve, reject) => {
    browserifyObject.bundle(async (err, buffer) => {
      try {
        if (err) throw new Error(err)
        const code = `${helpers.headerMessage}\n${buffer}`

        await fs.mkdir(helpers.bandlePath)

        await fs.appendFile(helpers.bandleFile(), code, {
          encoding: 'utf8'
        })

        resolve()
      } catch (error) {
        console.error('ERROR-TASK-BUNDLE ->', error.message)
        reject(error)
      }
    })
  })
}
