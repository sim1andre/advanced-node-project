'use strict'

const gulp = require('gulp');
var plugins = require('gulp-load-plugins')({ pattern: '*' });
const gutil = require('gulp-util');
const browserSync = require('browser-sync');
const buffer = require('vinyl-buffer');
const scsslint = require('gulp-scss-lint');
const browserify = require('browserify');
const jshint = require('gulp-jshint');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
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


gulp.task('browser-sync', () => {

  browserSync.init({
      proxy: {
        target: 'localhost/advanced-gulp-project/',
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

  plugins.watch( dest.js + '*.js').on("change", browserSync.reload);
  plugins.watch('./**/*.{html,php,jade}').on("change", browserSync.reload);

});



gulp.task('styles', (cb) => {

  plugins.watch(src.scss, (cb) => {
    return gulp.src(src.scss)
      .pipe(plugins.plumber({errorHandler: "Error: <%= error.message %>"}))
      .pipe(plugins.cssGlobbing({
        extensions: '.scss'
      }))
      .pipe(plugins.if(!prod && use_scss_lint , scsslint()))
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions','> 5%'],
        cascade: false
      }))
      .pipe(plugins.if(prod, plugins.cssmin()))
      .pipe(plugins.if(prod, plugins.rename({ suffix: '.min'})))
      .pipe(gulp.dest(dest.css))
      .pipe(plugins.if(use_browserSync, browserSync.stream()));
  });

});


gulp.task('script', (cb) => {

  plugins.watch(src.js, (cb) => {

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
      .pipe(plugins.if(!prod  && use_js_hint, jshint()))
      .pipe(buffer())
      .pipe(plugins.if( prod , plugins.uglify()))
      .pipe(plugins.if( prod , plugins.rename({ suffix: '.min' })))
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

  plugins.watch(globals, ['styles','script'])
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

gulp.task('default', plugins.if(prod, ['prepare-prod','styles','script','browser-sync','callback'] ,['styles','script','browser-sync','callback']));
