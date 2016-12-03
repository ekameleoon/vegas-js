"use strict" ;

import gulp from 'gulp' ;
import gzip from 'gulp-gzip' ;
import pump from 'pump' ;

import config from '../config.json' ;

export var zip = ( done ) =>
{
    pump([
        gulp.src( [ config.output + '/' + config.name + '.min.js' ] ) ,
        gzip({ append: true }),
        gulp.dest( config.output )
    ] , done );
}