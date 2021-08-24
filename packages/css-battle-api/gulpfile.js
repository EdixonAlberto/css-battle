// GULP MODULES
const { src, dest, task, series } = require('gulp')
const { createProject } = require('gulp-typescript')
const rimraf = require('gulp-rimraf')
const prettier = require('gulp-prettier')
const gulpMinify = require('gulp-minify')

// OTHER MODULES
const { createBundle } = require('./tools/createBundle')

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
  tsResult.dts.pipe(dest('dist/@types'))
  tsResult.js.pipe(dest('dist'))
  done()
}

// TASK BUNDLE
async function bundle(done) {
  await createBundle()
  done()
}

// TASK MINIFY
function minify(done) {
  const miniBundle = gulpMinify({
    ext: { min: '.min.js' },
    preserveComments: 'some'
  })
  src('dist/bundle/CSSBattleAPI.js').pipe(miniBundle).pipe(dest('dist/bundle'))
  done()
}

task('build', series(format, clean, transpile, bundle, minify))
