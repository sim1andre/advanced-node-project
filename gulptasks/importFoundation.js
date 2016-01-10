module.exports = function(gulp, plugins, dest) {

  gulp.src( './node_modules/foundation-sites/**/*.*')
    .pipe(gulp.dest( dest.vendor + '/foundation/' ));
    
}
