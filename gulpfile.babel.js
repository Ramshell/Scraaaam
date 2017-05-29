'use strict';

import gulp from 'gulp';
import mocha from 'gulp-mocha';
import { lintTask } from './gulp_scripts/lintTask'
import { server, transpile } from './gulp_scripts/server'
import { backend_tests } from './gulp_scripts/backendTests'

const dirs = {
  src: 'src',
  dest: 'dist',
  test: 'test'
};

gulp.task('lint', lintTask(dirs.src));

gulp.task('transpile', transpile(dirs.src, dirs.dest));

gulp.task('server', ['transpile'], server(dirs.src, dirs.dest));

gulp.task('backend-test', backend_tests(dirs.test));
