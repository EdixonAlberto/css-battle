const { resolve } = require('path')
const browserify = require('browserify')
const banner = require('browserify-banner')
const source = require('vinyl-source-stream')
const { headerMessage } = require('../tools/helpers')

module.exports.createBundle = () => {
  return browserify(resolve('tools', 'templateBundle.js'), {
    debug: true
  })
    .plugin(banner, { banner: headerMessage })
    .bundle()
    .pipe(source('CSSBattleAPI.js'))
}
