var gulp = require('gulp');
var watch = require('gulp-watch');
var recess = require('gulp-recess');

gulp.task('default', function () {
  return gulp.src('static/main.css')
    .pipe(watch())
    .pipe(recess())
    .pipe(recess.reporter());
});