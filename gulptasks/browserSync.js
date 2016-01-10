module.exports = function(gulp, plugins, src, dest) {

  plugins.browserSync.init({
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

  plugins.watch( dest.js + '*.js').on("change", plugins.browserSync.reload);
  plugins.watch('./**/*.{html,php,jade}').on("change", plugins.browserSync.reload);


}
