'use strict'

const buffer = require('vinyl-buffer');
const browserify = require('browserify');
const jshint = require('gulp-jshint');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const babelify = require('babelify');
const gutil = require('gulp-util');

module.exports = function(gulp, plugins, src, dest, cb, prod, js_hint) {

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
      .pipe(plugins.if(!prod  && js_hint, jshint()))
      .pipe(buffer())
      .pipe(plugins.if( prod , plugins.uglify()))
      .pipe(plugins.if( prod , plugins.rename({ suffix: '.min' })))
      .pipe(gulp.dest( dest.js ));

  });

}
