'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const fileinclude = require('gulp-file-include');

const paths = {
  scripts: {
    src: './',
    dest: './public/'
  }
};

async function includeHTML(){
  return gulp.src([
    '*.html',
    // '!./components/comp-header.html', // ignore
    // '!./components/comp-search.html', // ignore
    // '!./components/comp-footer.html' // ignore
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(paths.scripts.dest));
}

function buildStyles() {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
};

exports.buildStyles = buildStyles;
// exports.includeHTML = includeHTML;

exports.default = start;

async function start() {
  buildStyles();
  // includeHTML();
}

exports.watch = function () {
  // gulp.watch(['*.html','./components/*.html'], gulp.series(['includeHTML']));
  gulp.watch('./sass/**/*.scss', gulp.series(['buildStyles']));
};


