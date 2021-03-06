import { env } from 'process';
import gulp from 'gulp';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import uglify from 'gulp-uglify';
import rev from 'gulp-rev';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

const DEBUG = env.NODE_ENV !== 'production';

gulp.task('build', ['build:client']);

gulp.task('build:client', ['lint'], function() {
  let src = browserify({
    entries: ["./src/client.js"],
    debug: DEBUG
  }).transform(babelify).bundle();
  src = src
    .pipe(source('bundle.js'))
    .pipe(buffer());
  if (!DEBUG) {
    src = src
      .pipe(uglify())
      .pipe(rev());
  }
  src = src.pipe(gulp.dest(`${__dirname}/public`));
  if (!DEBUG) {
    let manifest = src
      .pipe(rev.manifest('manifest.json', {
        merge: true
      }))
      .pipe(gulp.dest(`${__dirname}/public`));
  }
  return src;
});

gulp.task('lint', function() {
  return gulp.src(['./src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', ['build:client'], function() {
  gulp.watch('./src/**/*.js', ['build:client']);
});
