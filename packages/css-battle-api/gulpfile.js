// GULP MODULES
const { src, dest, task, series } = require('gulp')
const { createProject } = require('gulp-typescript')
const rimraf = require('gulp-rimraf')
const prettier = require('gulp-prettier')
const gulpMinify = require('gulp-minify')
const jest = require('gulp-jest').default

// OTHER MODULES
const { createBundle } = require('./tools/createBundle')

const BUNDLE_PATH = 'dist/bundle'

// TASK FORMAT
function format(done) {
  src('src/**/.*ts').pipe(prettier()).pipe(dest('src'))
  done()
}

// TASK CLEAN
function clean(done) {
  src('dist', { read: false, allowEmpty: true }).pipe(rimraf())
  done()
}

// TASK TRANSPILE
function transpile(done) {
  const tsProject = createProject('tsconfig.json')
  const tsResult = tsProject.src().pipe(tsProject())
  tsResult.pipe(dest('dist'))
  done()
}

// TASK TEST
task('test', () => {
  return src('tests').pipe(
    jest({
      preprocessorIgnorePatterns: ['./dist/', './node_modules/'],
      automock: false,
      preset: 'ts-jest',
      testTimeout: 1000 * 60
    })
  )
})

// TASK BUNDLE
task('bundle', () => {
  return createBundle().pipe(dest(BUNDLE_PATH))
})

// TASK MINIFY
task('minify', () => {
  const bundleMini = gulpMinify({
    ext: { min: '.min.js' },
    preserveComments: 'some'
  })
  return src(BUNDLE_PATH + '/*js')
    .pipe(bundleMini)
    .pipe(dest(BUNDLE_PATH))
})

task('build', series(format, clean, transpile))
