module.exports = function(gulp, plugins, dest) {
  gulp.src( './bower_components/foundation/scss/**/*.*')
    .pipe(gulp.dest( dest.vendor + '/foundation/' ));
}
