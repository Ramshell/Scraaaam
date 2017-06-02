import gulp from 'gulp';
import webpackModule from 'webpack';
import gulpWebpack from 'gulp-webpack';
import config from '../webpack.config.js';

export function webpack(src, dist) {
    return () => {
        return gulp.src([`${src}/frontend/**/*`])
            .pipe(gulpWebpack(config, webpackModule))
            .pipe(gulp.dest(`${dist}/frontend/`));
    }
}
