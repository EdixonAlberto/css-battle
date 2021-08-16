const { src, dest, task, series } = require('gulp')
const ts = require('gulp-typescript')
const rimraf = require('gulp-rimraf')
const browserify = require('browserify')
const { resolve } = require('path')
const fs = require('fs')

function clean(done) {
  src('./dist', { read: false }).pipe(rimraf({ force: true }))

  done()
}

function transpile(done) {
  const tsProject = ts.createProject('tsconfig.json')

  const tsResult = tsProject.src().pipe(tsProject())
  tsResult.js.pipe(dest('dist'))

  done()
}

/*

(err, buffer) => {
      if (err) {
        console.error('ERROR-BUNDLE ->', err.message)
        throw new Error(err)
      } else {
        const code = `${getHeaderMessage()}\n${buffer}`
        return code
      }
    }
*/

// TODO: Terminar creacion de bundle y minify
function bundle(done) {
  const pkgMain = JSON.parse(
    fs.readFileSync(resolve('../', '../', 'package.json'), 'utf8')
  )
  const pkgApi = JSON.parse(fs.readFileSync('package.json'), 'utf8')
  const year = new Date().getFullYear().toString()

  const headerMessage = `/*!
   *   ${pkgApi.name} v${pkgApi.version}
   *   ${pkgApi.description}
   *   Copyright (c) 2020-${year} ${pkgMain.author.name}
   *   Released under the ${pkgApi.license} License.
   */`

  const PATH_BASE = resolve('dist', 'bundle')

  browserify(resolve('tools', 'templateBundle.js'), {
    debug: true
  })
    .bundle((err, beffer) => {
      console.log(buffer)
      return `${headerMessage}\n${buffer}`
    })
    .pipe(dest('./bundle'))

  done()
}

task('build', series(clean, transpile))
