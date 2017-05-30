import gulp from 'gulp';
import mocha from 'gulp-mocha';

export function backend_tests(test){
  return () =>
  	gulp.src(`${test}/backend/**/*.js`, {read: false})
  		.pipe(mocha({
        compilers: 'js:babel-core/register',
        timeout: 120000,
        globals: [ 'recursive'],
        require: [ 'babel-polyfill'],
      }))
}
