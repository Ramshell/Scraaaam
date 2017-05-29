'use strict';

import gulp from 'gulp';
import { lintTask } from './gulp_scripts/lintTask'
import { server, transpile } from './gulp_scripts/server'
import { backend_tests } from './gulp_scripts/backendTests'
import { frontend_components_tests } from './gulp_scripts/components'
import { protractor } from 'gulp-protractor'

const dirs = {
  src: 'src',
  dest: 'dist',
  test: 'test'
};

gulp.task('lint', lintTask(dirs.src));

gulp.task('transpile', transpile(dirs.src, dirs.dest));

gulp.task('server', ['transpile'], server(dirs.src, dirs.dest));

gulp.task('backend-test', backend_tests(dirs.test));

gulp.task('frontend-components-test', frontend_components_tests(__dirname));

gulp.task('frontend-e2e-test', () => {
  return gulp.src(["./src/tests/frontend/e2e/*.js"])
    .pipe(protractor({
        configFile: "protractor.conf.js"
    }))
});
