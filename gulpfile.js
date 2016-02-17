var gulp = require('gulp');
var concat = require('gulp-concat-sourcemap');
var eslint = require('gulp-eslint');
var del = require('del');
var templateCache = require("gulp-angular-templatecache");
var dependencies = require('./dependencies.json');

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('lint', ['clean'], function () {
  return gulp.src('./src/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint']);

gulp.task('dependencies.styles', ['test'], function () {
  return gulp.src(dependencies.styles)
    .pipe(concat('dependencies.css', { sourcesContent: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('dependencies.scripts', ['test'], function () {
  return gulp.src(dependencies.scripts)
    .pipe(concat('dependencies.js', { sourcesContent: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('dependencies', [
  'dependencies.styles',
  'dependencies.scripts'
]);

gulp.task('resources', ['test'], function () {
  return gulp.src('resources/**')
    .pipe(gulp.dest('dist'));
});

gulp.task('styles', ['test'], function () {
  var styles = [
    './src/components/**/*.css',
    './src/views/**/*.css',
    './src/theme/**/*.css'
  ];

  return gulp.src(styles)
    .pipe(concat('styles.css', { sourcesContent: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', ['test'], function () {
  return gulp.src('./src/**/*.js')
    .pipe(concat('scripts.js', { sourcesContent: true }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('templates', ['test'], function () {
  var templates = [
    './src/components/**/*.html',
    './src/views/**/*.html'
  ];

  return gulp.src(templates)
    .pipe(templateCache('templates.js', {
      module: 'templates',
      standalone: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('index', ['test'], function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', [
  'dependencies',
  'resources',
  'styles',
  'scripts',
  'templates',
  'index'
]);
