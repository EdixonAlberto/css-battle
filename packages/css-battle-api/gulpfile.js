const { src, dest, task, series } = require('gulp')
const ts = require('gulp-typescript')
const rimraf = require('gulp-rimraf')
const browserify = require('browserify')
const { resolve } = require('path')
const { createHeaderMessage } = require('./tools/createHeaderMessage')

console.log(createHeaderMessage)

// Task clean
function clean(done) {
  src('./dist', { read: false }).pipe(rimraf({ force: true }))

  done()
}

// Task transpile
function transpile(done) {
  const tsProject = ts.createProject('tsconfig.json')

  const tsResult = tsProject.src().pipe(tsProject())
  tsResult.js.pipe(dest('dist'))

  done()
}

// Task bundle
// FIXME: La tarea bundle da error, se debe terminar
function bundle(done) {
  const pathBundle = resolve('dist', 'bundle')
  const pathTemplate = resolve('tools', 'templateBundle.js')
  const headerMessage = createHeaderMessage()

  browserify(pathTemplate, { debug: true })
    .bundle((err, beffer) => {
      return `${headerMessage}\n${buffer}`
    })
    .pipe(dest(pathBundle))

  done()
}

// TODO: crear tarea minify
function minify(done) {
  done()
}

task('build', series(clean, transpile))
