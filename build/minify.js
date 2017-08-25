"use strict" ;

import config from '../config.json' ;
import gulp   from 'gulp' ;
import header from 'gulp-header' ;
import pump   from 'pump' ;
import rename from 'gulp-rename' ;
import uglify from 'gulp-uglify' ;
import yargs  from 'yargs' ;

import { version } from './version.js' ;

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

export var minify = ( done ) =>
{
    pump([
        gulp.src( [ build.output + '/' + build.file + '.js' ] ) ,
        uglify(),
        rename( build.file + '.min.js'),
        header( build.header , { version : version } ) ,
        gulp.dest( build.output )
    ] , done );
}