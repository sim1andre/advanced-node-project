'use strict'

//PROJECT SETTINGS--------------------------------------------------------------
var prod = false;
var use_browserSync = true;
var use_scss_lint = false;
var use_js_hint = true;


//LOAD PLUGINS------------------------------------------------------------------
const gulp = require('gulp');
const plugins = require('gulp-load-plugins')({ pattern: '*' });
const browserSync = require('browser-sync');


//LOAD CREATE TASK MODULE-------------------------------------------------------
const createTaskArray = require('./gulptasks/createTask');


//LOAD FILEPATHS----------------------------------------------------------------
const src = require('./gulpsettings/sourcePaths');
const dest = require('./gulpsettings/destPaths');

//TASKS-------------------------------------------------------------------------

gulp.task('browser-sync', () => { require('./gulptasks/browserSync')(gulp, plugins, src, dest) });

gulp.task('styles', (cb) => { require('./gulptasks/styles')(gulp, plugins, src, dest, cb, prod, use_scss_lint, use_browserSync) });

gulp.task('script', (cb) => { require('./gulptasks/script')(gulp, plugins, src, dest, cb, prod) });

gulp.task('images', (cb) => { require('./gulptasks/images')(gulp, plugins, src, dest, cb) });

gulp.task('iconfonts', (cb) => { require('./gulptasks/iconFont')(gulp, plugins, src, dest, cb) });

gulp.task('watch', (cb) => { require('./gulptasks/watch')(gulp, plugins, src, dest, cb) });

//gulp.task('server', (cb) => { require('./gulptasks/startServer')(gulp, plugins,cb) });

gulp.task('foundation', () => { require('./gulptasks/importFoundation')(gulp, plugins, dest)});


//SET TASKS TO RUN--------------------------------------------------------------

let gulpTasks = {
  'tasks': [
    { 'name':'browser-sync', 'run': use_browserSync },
    { 'name':'styles', 'run':true },
    { 'name':'script', 'run':true },
    { 'name':'images', 'run':true },
    { 'name':'watch', 'run':true }
  ]
}

//DEFAULT RUN TASK--------------------------------------------------------------

gulp.task('default', createTaskArray(gulpTasks));
