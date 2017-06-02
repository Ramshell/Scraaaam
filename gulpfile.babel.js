'use strict';

import gulp from 'gulp';
import {lintTask} from './gulp_scripts/lintTask'
import {hotServer, server, transpile} from './gulp_scripts/server'
import {backend_tests} from './gulp_scripts/backendTests'
import {frontend_components_tests} from './gulp_scripts/components'
import {initProtractor} from './gulp_scripts/protractor'
import {webpack} from "./gulp_scripts/webpack";
import run from 'gulp-run'


const dirs = {
    src: 'src',
    dist: 'dist',
    test: 'test'
};

gulp.task('lint', lintTask(dirs.src));

gulp.task('transpile', transpile(dirs.src, dirs.dist));

gulp.task('webpack', webpack(dirs.src, dirs.dist));

gulp.task('build', ['transpile', 'webpack'])

gulp.task('hot-server', ['build'], hotServer(dirs.src, dirs.dist));

gulp.task('server', server(dirs.dist));

gulp.task('backend-test', backend_tests(dirs.test));

gulp.task('frontend-components-test', frontend_components_tests(__dirname));

gulp.task('frontend-e2e-test', initProtractor(dirs.src));

gulp.task('frontend-all', ['frontend-components-test', 'frontend-e2e-test']);

gulp.task('all-non-e2e', ['frontend-components-test', 'backend-test']);

gulp.task('coverage', () =>
    run('npm run coverage').exec());
