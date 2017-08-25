"use strict" ;

import { doc }       from './build/doc.js' ;
import { minify }    from './build/minify.js' ;
import { roll }      from './build/compile-rollup.js' ;
import { unittests } from './build/unittests.js' ;
import { watching }  from './build/watch.js' ;
import { zip  }      from './build/zip.js' ;

import gulp from 'gulp' ;

gulp.task( 'build:rollup' , gulp.series( roll , minify ) ) ;
gulp.task( 'build'        , gulp.series( roll , minify ) ) ;

gulp.task( 'doc' , gulp.series( doc ) ) ;
gulp.task( 'ut'  , gulp.series( unittests ) ) ;
gulp.task( 'zip' , gulp.series( zip ) ) ;

var sources = ['src/**/*.js' , './tests/**/*.js' ] ;

gulp.task( 'watch' , () =>
{
    gulp.watch
    (
        sources , gulp.series( roll , minify )
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

gulp.task( 'default' , gulp.series( unittests , roll , minify , doc ) ) ;