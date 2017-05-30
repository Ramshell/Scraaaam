import gulp from 'gulp';
import gls from 'gulp-live-server';
import babel from 'gulp-babel';

export function server(src, dist){
  return () => {
    var server = gls.new(`${dist}/backend/index.js`);
    server.start();
    gulp.watch([`${src}/backend/**/*.js`], ['transpile']);
    gulp.watch(`${dist}/backend/index.js`, () => server.start());
  }
}

export function transpile(src, dist){
  return () => {
    gulp.src([`${src}/backend/**/*.js`])
    .pipe(babel())
    .pipe(gulp.dest(`${dist}/backend/`));
  }
}
