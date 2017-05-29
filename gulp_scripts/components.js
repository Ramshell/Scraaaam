import gulp from 'gulp';
import { Server } from 'karma';

export function frontend_components_tests(dir){
  return (done) => {
    return new Server({
      configFile: `${dir}/karma.conf.js`,
      singleRun: true
    }, done).start();
  }
}
