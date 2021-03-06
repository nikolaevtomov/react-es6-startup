'use strict';

import gulp         from 'gulp';
import sass         from 'gulp-sass';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import browserSync  from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';
import handleErrors from '../util/handle-errors';
import config       from '../config';

gulp.task('sass', () => {

  return gulp.src(config.styles.src)
    .pipe(sass({
      sourceComments: global.isProd ? false : 'map',
      outputStyle: global.isProd ? 'compressed' : 'nested',
      includePaths: require('node-bourbon').with('node_modules/normalize.css')
      // includePaths: ['node_modules/normalize.css']
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulpif(!global.isProd, sourcemaps.write('.')))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});
