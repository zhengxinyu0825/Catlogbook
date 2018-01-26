var gulp = require('gulp');
var gutil = require('gulp-util');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var bower = require('bower');
var concat = require('gulp-concat');
var preprocess = require('gulp-preprocess');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var extend      = require('extend');
var parseArgs   = require('minimist');
var runSequence = require('run-sequence');
var gulpif      = require('gulp-if');
var uglify      = require('gulp-uglify');
var sh = require('shelljs');

var vendorConfig = [
  'lib/ionic-platform-web-client/dist/ionic.io.bundle.min.js',
  'lib/ngCordova/dist/ng-cordova.min.js',
  'lib/curl/dist/curl/curl.js',
  'lib/angular-translate/angular-translate.min.js',
  'lib/angular-translate-loader-url/angular-translate-loader-url.min.js',
  'lib/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
  'lib/angular-cookies/angular-cookies.min.js',
  'lib/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
  'lib/angular-translate-storage-local/angular-translate-storage-local.min.js',
  'lib/lodash/dist/lodash.min.js',
  'lib/restangular/dist/restangular.min.js',
  'lib/moment/min/moment.min.js',
  'lib/angular-moment/angular-moment.min.js',
  'lib/ionic-modal-select/dist/ionic-modal-select.min.js'
];

var paths = {
  settings: ['./src/config/appsettings.js'],
  scripts: ['./src/js/**/app.js', './src/js/**/{!(app.js), *.js}'],
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['vendor','sass','scripts'], function(){
  gutil.log('Gulp is running!');
});

gulp.task('vendor', function() {
  return vendorConfig.forEach(function(path) {
    gulp.src(path)
    .pipe(gulp.dest('www/lib'));
  });
});


gulp.task('scripts', function () {
    return gulp.src(paths.scripts)        
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./www/js'));
});


gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function() {
  gulp.watch(paths.sass,    ['sass']);
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('dev', function() {
  gulp.src(paths.settings)
    .pipe(preprocess({context: { ENV: 'DEVELOPMENT'}}))
    .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('demo', function() {
  gulp.src(paths.settings)
    .pipe(preprocess({context: { ENV: 'DEMO'}}))
    .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('stage', function() {
  gulp.src(paths.settings)
    .pipe(preprocess({context: { ENV: 'STAGE'}}))
    .pipe(gulp.dest('./src/js/config/'));
});

gulp.task('prod', function() {
  gulp.src(paths.settings)
    .pipe(preprocess({context: { ENV: 'PRODUCTION'}}))
    .pipe(gulp.dest('./src/js/config/'));
});