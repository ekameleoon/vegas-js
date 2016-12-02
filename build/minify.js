"use strict" ;

import gulp   from 'gulp' ;
import header from 'gulp-header' ;
import pump   from 'pump' ;
import rename from 'gulp-rename' ;
import uglify from 'gulp-uglify' ;

import config from '../config.json' ;
import { version } from './version.js' ;

export var minify = ( done ) =>
{
    pump([
        gulp.src( [ config.output + '/' + config.name + '.js' ] ) ,
        uglify(),
        rename( config.name + '.min.js'),
        header( config.header , { version : version } ) ,
        gulp.dest( config.output )
    ] , done );
}