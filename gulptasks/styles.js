const scsslint = require('gulp-scss-lint');

module.exports = function(gulp, plugins, src, dest, cb, prod, use_scss_lint, use_browserSync) {

  plugins.watch(src.scss, (cb) => {
    return gulp.src(src.scss)
      .pipe(plugins.plumber({errorHandler: "Error: <%= error.message %>"}))
      .pipe(plugins.cssGlobbing({
        extensions: '.scss'
      }))
      .pipe(plugins.if(use_scss_lint , scsslint()))
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 versions','> 5%'],
        cascade: false
      }))
      .pipe(plugins.if(prod, plugins.cssmin()))
      .pipe(plugins.if(prod, plugins.rename({ suffix: '.min'})))
      .pipe(gulp.dest(dest.css))
      .pipe(plugins.if(use_browserSync, plugins.browserSync.stream()));
  });

}
