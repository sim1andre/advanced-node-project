const imageminJpegtran = require('imagemin-jpegtran');
const pngquant = require('imagemin-pngquant');
const imageminOptipng = require('imagemin-optipng');
const imageminGifsicle = require('imagemin-gifsicle');

module.exports = function(gulp, plugins, src, dest, cb) {

  plugins.watch( src.images , function (cb) {

    return gulp.src( src.images )
      .pipe(plugins.plumber())
      .pipe(plugins.imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
       }))
      .pipe(plugins.imageminOptipng({optimizationLevel: 7})())
      .pipe(plugins.imageminGifsicle({interlaced: true})())
      .pipe(plugins.imageminJpegtran({progressive: true })())
      .pipe(gulp.dest( dest.images ));

  });


}
