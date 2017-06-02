import gulp from 'gulp';
import eslint from 'gulp-eslint'

export function lintTask(src){
  return () => {
    return gulp.src([`${src}/**/*.js`,'!node_modules/**'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
    }
}
