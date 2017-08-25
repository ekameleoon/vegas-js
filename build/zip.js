"use strict" ;

import config from '../config.json' ;
import gulp   from 'gulp' ;
import gzip   from 'gulp-gzip' ;
import pump   from 'pump' ;
import yargs  from 'yargs' ;

// --------- Initialize

var argv  = yargs.argv ;
var build = config.vegas ; // default

// --------- Arguments

/**
 * If not null, the default build library is 'vegas'. Use the library settings with the values : 'vegas' or 'molecule'.
 * You can use the dot notation to target a specific build, ex: --library molecule.
 */
if( argv && argv.library && argv.library in config)
{
    build = config[argv.library] ;
}

// --------- Task

export var zip = ( done ) =>
{
    pump([
        gulp.src( [ build.output + '/' + build.file + '.min.js' ] ) ,
        gzip({ append: true }),
        gulp.dest( config.output )
    ] , done );
}