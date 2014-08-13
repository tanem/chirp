var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var browserify = require('browserify');
var karma = require('karma').server;
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

gulp.task('watchify', function(){
  var bundler = watchify(browserify('./browser/main.js', watchify.args));
  var rebundle = function(){
    return bundler.bundle()
      .on('error', function(e){
        gutil.log(gutil.colors.cyan('\'watchify\''), gutil.colors.red('error'), e);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('static'));
  };
  bundler.transform('reactify');
  bundler.on('update', rebundle);
  bundler.on('log', function(msg){
    gutil.log(gutil.colors.cyan('\'watchify\''), msg);
  });
  return rebundle();
});

//one could also externalize common config into a separate file,
//ex.: var karmaCommonConf = require('./karma-common-conf.js');
var karmaCommonConf = {
  browsers: ['Chrome'],
  frameworks: ['jasmine'],
  files: [
    'static/bundle.js',
    'browser/test/*.test.js'
  ]
};

/**
 * Run test once and exit
 */
gulp.task('test', function (done) {
  karmaCommonConf.singleRun = true;
  karma.start(karmaCommonConf, done);
});

/**
 * Watch for file changes and re-run tests on each change
 */
gulp.task('tdd', function (done) {
  karma.start(karmaCommonConf, done);
});

gulp.task('default', ['css', 'jshint', 'watchify']);