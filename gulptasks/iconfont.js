module.exports = function(gulp, plugins, src, dest, cb) {

  plugins.watch( src.icons , (cb) => {

    gulp.src( src.icons )
    .pipe(plugins.iconfontCss({
      fontName: 'iconFont',
      path: src.icon_template + 'icon-template.css',
      targetPath: './iconfont.css',
      fontPath: './iconfont.css'
    }))
    .pipe(plugins.iconfont({
      fontName: 'myFont'
    }))
    .pipe(gulp.dest(dest.iconfonts));

  });


}
