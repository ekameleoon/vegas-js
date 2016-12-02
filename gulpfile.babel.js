"use strict" ;

import { compile }   from './build/compile.js' ;
import { doc }       from './build/doc.js' ;
import { minify }    from './build/minify.js' ;
import { unittests } from './build/unittests.js' ;
import { watching }  from './build/watch.js' ;

import gulp from 'gulp' ;

gulp.task( 'default'  , gulp.series( unittests , compile , minify ) ) ;
gulp.task( 'build'    , gulp.series( compile , minify ) ) ;
gulp.task( 'doc'      , gulp.series( doc ) ) ;
gulp.task( 'ut'       , gulp.series( unittests ) ) ;

var sources = ['src/**/*.js' , './tests/**/*.js' ] ;

gulp.task( 'watch' , () =>
{
    gulp.watch
    (
        sources , gulp.series( compile , minify )
    );
} ) ;

gulp.task( 'watch:ut' , () =>
{
    watching.flag = true;
    gulp.watch
    (
        sources , gulp.series( unittests )
    );
} ) ;