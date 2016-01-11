'use strict'

const nodemon = require('gulp-nodemon');

module.exports = function(gulp, plugins, cb) {

  let started = false;

  nodemon({
    script: 'server.js'

  }).on('start', () => {

   //Preventing from starting multiple times
   if (!started) {
			cb();
			started = true;
	 }

 });
}
