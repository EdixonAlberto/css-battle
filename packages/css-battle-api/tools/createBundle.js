const fs = require('fs/promises')
const { resolve } = require('path')
const browserify = require('browserify')

module.exports.createBundle = async ({ bundlePath, headerMessage }) => {
  const browserifyObject = browserify(resolve('tools', 'templateBundle.js'), {
    debug: true
  })

  return new Promise((resolve, reject) => {
    browserifyObject.bundle(async (err, buffer) => {
      try {
        if (err) throw new Error(err)
        const code = `${headerMessage}\n${buffer}`

        await fs.mkdir(bundlePath.base)

        await fs.appendFile(bundlePath.file, code, {
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
