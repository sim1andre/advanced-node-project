module.exports = (gulp, plugins, src, dest) => {

  plugins.browserSync.init({
      proxy: 'http://localhost:3000',
      files: ['dest/**/*.*'],
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
  plugins.watch('./**/*.{html,jade}').on("change", plugins.browserSync.reload);


}
