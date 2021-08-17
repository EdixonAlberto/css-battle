const { src, dest, task, series } = require('gulp')
const ts = require('gulp-typescript')
const rimraf = require('gulp-rimraf')
const prettier = require('gulp-prettier')
const browserify = require('browserify')
const { resolve } = require('path')
const { createHeaderMessage } = require('./tools/createHeaderMessage')

// Task Format
function format(done) {
  src('src/**/.*ts').pipe(prettier()).pipe(dest('src'))

  done()
}

// Task Clean
function clean(done) {
  src('./dist', { read: false }).pipe(rimraf({ force: true }))

  done()
}

// Task Transpile
function transpile(done) {
  const tsProject = ts.createProject('tsconfig.json')

  const tsResult = tsProject.src().pipe(tsProject())
  tsResult.pipe(dest('dist'))

  done()
}

// Task Bundle
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

task('build', series(format, clean, transpile))
