import gulp from 'gulp';
import gls from 'gulp-live-server';
import babel from 'gulp-babel';

export function hotServer(src, dist) {
    return () => {
        const hotServer = server(dist)()
        gulp.watch([`${src}/backend/**/*.js`], ['transpile'], () => hotServer.start());
        gulp.watch([`${src}/frontend/**/*`], ['webpack'], () => hotServer.start());
    }
}

export function server(dist) {
    return () => {
        const server = gls.new(`${dist}/backend/index.js`);
        server.start();
        return server;
    }
}

export function transpile(src, dist) {
    return () => {
        return gulp.src([`${src}/backend/**/*.js`])
            .pipe(babel())
            .pipe(gulp.dest(`${dist}/backend/`));
    }
}
