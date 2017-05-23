'use strict';

import gulp from 'gulp';
import eslint from 'gulp-eslint'
import gls from 'gulp-live-server';
import babel from 'gulp-babel';
import mocha from 'gulp-mocha';

const dirs = {
  src: 'src',
  dest: 'build'
};

gulp.task('default', () => {
  console.log('hello world')
});

gulp.task('lint', () => {
    return gulp.src(['src/**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('transpile', () => {
  gulp.src(['src/backend/**/*.js'])
  .pipe(babel())
  .pipe(gulp.dest('dist/backend/'));
});

gulp.task('server', ['transpile'], () => {
  var server = gls.new('dist/backend/index.js');
  server.start();
  gulp.watch(['src/backend/**/*.js'], ['transpile']);
  gulp.watch('dist/backend/index.js', () => server.start());
});

gulp.task('backend-test', () =>
	gulp.src('test/backend/**/*.js', {read: false})
		.pipe(mocha({
      compilers: 'js:babel-core/register',
      timeout: 120000,
      globals: [ 'recursive'],
      require: [ 'babel-polyfill'],
    }))
);
