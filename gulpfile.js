var gulp = require('gulp');
var watch = require('gulp-watch');
var recess = require('gulp-recess');
var jshint = require('gulp-jshint');
var react = require('gulp-react');
var gulpif = require('gulp-if');

gulp.task('css', function(){
  return gulp.src('static/main.css')
    .pipe(watch())
    .pipe(recess())
    .pipe(recess.reporter());
});

gulp.task('jshint', function(){
  return gulp.src(['.jshintrc', 'browser/*.js'])
    .pipe(watch())
    .pipe(gulpif(/\.js$/, react()))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default', ['css', 'jshint']);