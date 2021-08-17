const { resolve } = require('path')
const fs = require('fs')

exports.createHeaderMessage = () => {
  const pkgMain = JSON.parse(
    fs.readFileSync(resolve('../', '../', 'package.json'), 'utf8')
  )
  const pkgApi = JSON.parse(fs.readFileSync(resolve('package.json')), 'utf8')
  const year = new Date().getFullYear().toString()

  return `/*!
   *   ${pkgApi.name} v${pkgApi.version}
   *   ${pkgApi.description}
   *   Copyright (c) 2020-${year} ${pkgMain.author.name}
   *   Released under the ${pkgApi.license} License.
   */`
}
