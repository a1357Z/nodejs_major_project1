const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))//create css from sass file
const cssnano = require('gulp-cssnano')//compress css to 1 line
const rev = require('gulp-rev')
let uglify = require('gulp-uglify-es').default;
const imageMin = require('gulp-imagemin')
const del = require('del')

// function defaultTask(cb) {
//   // place code for your default task here
//   cb();
// }

gulp.task('css', function(done) {
  console.log('minfying css...');
  gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'))// check this line

  gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({ //the manifest file stores the map of the renamed files to the actual files
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'))

  done()
})

gulp.task('js', function (done) {
  console.log('minfying js...');
  gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'))

  done()
})

gulp.task('images', function (done) {
  console.log('minfying images...')
  gulp.src('./assets/**/*.+(png|jpg|gif|jpeg|svg)')
    .pipe(imageMin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
      cwd: 'public',
      merge: true
    }))
    .pipe(gulp.dest('./public/assets'))

  done()
})

//empty the public assets directory
gulp.task('clean:assets', function(done) {
  del.sync('./public/assets')
  done()
})

//running all the tasks in series
gulp.task('build', gulp.series('clean:assets','css', 'js', 'images'),function (done) {
  console.log('bulding assets');
  done()
})