// GULP MODULES
const { src, dest, task, series } = require('gulp')
const { createProject } = require('gulp-typescript')
const rimraf = require('gulp-rimraf')
const prettier = require('gulp-prettier')

// OTHER MODULES
const { createBundle } = require('./tools/createBundle')

// TASK FORMAT
function format(done) {
  src('src/**/.*ts').pipe(prettier()).pipe(dest('src'))
  done()
}

// TASK CLEAN
function clean(done) {
  src('dist', { read: false }).pipe(rimraf({ force: true }))
  done()
}

// TASK TRANSPILE
function transpile(done) {
  const tsProject = createProject('tsconfig.json')
  const tsResult = tsProject.src().pipe(tsProject())
  tsResult.pipe(dest('dist'))
  done()
}

// TASK BUNDLE
function bundle(done) {
  createBundle()
  done()
}

// TODO: crear tarea minify
function minify(done) {
  done()
}

task('build', series(format, clean, transpile, bundle))
