const { src, dest, task, series } = require('gulp')
const ts = require('gulp-typescript')
const rimraf = require('gulp-rimraf')
const prettier = require('gulp-prettier')
const { createHeaderMessage } = require('./tools/createHeaderMessage')
const gulpRimraf = require('gulp-rimraf')
var browserify = require("browserify")
var tsify = require("tsify")
var source = require("vinyl-source-stream")

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
function bundle(done) {
  const pathBundle = 'dist/bundle'
  const pathTemplate = 'tools/templateBundle.js'
  const headerMessage = createHeaderMessage()

  browserify(pathTemplate, {
    basedir: '.',
    debug: false,
    allowEmpty: true
  })
  .plugin(tsify)
  .bundle((err, beffer) => {
    if (err) {
      console.error(err)
    }
    return `${headerMessage}\n${beffer}`
  })
  .pipe(source(pathBundle))
  .pipe(dest(pathBundle))
  done()
}

// TODO: crear tarea minify
function minify(done) {
  done()
}

task('build', series(format, bundle, clean, transpile, ))
