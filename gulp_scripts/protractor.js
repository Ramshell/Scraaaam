import gulp from 'gulp';
import { protractor } from 'gulp-protractor'

export function initProtractor(src){
  return () => {
    return gulp.src([`./${src}/tests/frontend/e2e/*.js`])
      .pipe(protractor({
          configFile: "protractor.conf.js"
      }))
  }
}
