var browserify = require('browserify');
var babelify = require('babelify');
var vueify = require('vueify');
var gulp = require('gulp');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('browserify', function() {

  var b = browserify({ 
    debug: true,
    entries: './lib/interface/index.js',
    transform: [vueify, babelify]
  });

  return b.bundle()
    .pipe(source('index.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/interface'));

});
