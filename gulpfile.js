'use strict'

const gulp = require('gulp');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const scsslint = require('gulp-scss-lint');
const cssGlobbing = require('gulp-css-globbing');
const autoprefixer = require('gulp-autoprefixer');
const browserify = require('browserify');
const jshint = require('gulp-jshint');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const babelify = require('babelify');
const del = require('del');
const path = require('path');
const fs = require('fs');


var prod = false;
var use_browserSync = true;
var use_scss_lint = true;
var use_js_hint = true;

//Filepaths
var src = {
  scss: './src/scss/**/*.*',
  js: './src/js/app.js'
}
var dest = {
  css: './dest/css/',
  js: './dest/js/'
}


'gulp.task('browser-sync', () => {

  browserSync.init({
      proxy: {
        target: 'localhost/basic-template/',
      },
      port: 4000,
      browser: ['chrome'],
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true,
        location: true,
        injectChanges: true
     }
  });

  watch( dest.js + '*.js').on("change", browserSync.reload);
  watch('./**/*.{html,php,jade}').on("change", browserSync.reload);

});



gulp.task('styles', (cb) => {

  watch(src.scss, (cb) => {
    return gulp.src(src.scss)
      .pipe(plumber({errorHandler: "Error: <%= error.message %>"}))
      .pipe(cssGlobbing({
        extensions: '.scss'
      }))
      .pipe(gulpif(!prod && use_scss_lint , scsslint()))
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions','> 5%'],
        cascade: false
      }))
      .pipe(gulpif(prod, cssmin()))
      .pipe(gulpif(prod, rename({ suffix: '.min'})))
      .pipe(gulp.dest(dest.css))
      .pipe(gulpif(use_browserSync, browserSync.stream()));
  });

});


gulp.task('script', (cb) => {

  watch(src.js, (cb) => {

    const bundler = browserify({
      cache: {},
      packageCache: {},
      entries: [src.js],
      debug: !prod
    });

    bundler.transform(babelify, {presets: ['es2015','react']});

    return bundler
      .bundle()
      .on('error', (err) => {
        gutil.log(
          gutil.colors.red('Browserify compile error: '),
          err.toString()
        )
      })
      .pipe(source('app.js'))
      .pipe(gulpif(!prod  && use_js_hint, jshint()))
      .pipe(buffer())
      .pipe(gulpif( prod , uglify()))
      .pipe(gulpif( prod , rename({ suffix: '.min' })))
      .pipe(gulp.dest( dest.js ));

  });

});

//Globals to watch
var globals = [
  './src/scss/**/**',
  './src/js/**/**',
  './**/*.{html,php,jade}'
];

gulp.task('callback', (cb) => {

  watch(globals, ['styles','script'])
  .on('change', (file) => {

    let filename = path.basename(file);
    gutil.log(gutil.colors.magenta('File changed: ' + filename));
    browserSync.reload;

  })
  .on('add', (file) => {

    let filename = path.basename(file);
    gutil.log(gutil.colors.magenta('File added: ' + filename));
    browserSync.reload;

  })
  .on('unlink', (file) => {

    let filename = path.basename(file);
    gutil.log(gutil.colors.magenta('File deleted: ' + filename));
    browserSync.reload;

  })

});

gulp.task('prepare-prod', () => {
  return del([
    dest.css + '**.css',
    dest.js + '**.js'
  ]);
});

gulp.task('default', gulpif(prod, ['prepare-prod','styles','script','browser-sync','callback'] ,['styles','script','browser-sync','callback']));
