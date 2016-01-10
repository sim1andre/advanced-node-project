'use strict'

//Globals to watch
var globals = [
  './src/scss/**/**',
  './src/js/**/**',
  './**/*.{html,php,jade}',
  './**/*.{png,jpeg,jpg,GIF,svg}'
];

const path = require('path');
const gutil = require('gulp-util');

module.exports = function(gulp, plugins, src, dest, cb) {

  plugins.watch(globals, ['styles','script','images','iconfonts'])

  .on('change', (file) => {

    let filename = path.basename(file);

    gutil.log(gutil.colors.magenta('File changed: ' + filename));
    plugins.browserSync.reload;

  })
  .on('add', (file) => {

    let filename = path.basename(file);

    gutil.log(gutil.colors.magenta('File added: ' + filename));
    plugins.browserSync.reload;

  })
  .on('unlink', (file) => {

    let filename = path.basename(file);
    
    gutil.log(gutil.colors.magenta('File deleted: ' + filename));
    plugins.browserSync.reload;

  });

}
