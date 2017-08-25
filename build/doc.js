"use strict" ;

import gulp  from 'gulp' ;
import jsdoc from 'gulp-jsdoc3' ;
import pump  from 'pump' ;

import config from '../config.json' ;

let sources = ['README.md' , './src/**/*.js' ] ; // './libs/**/*.js'

export var doc = ( done ) =>
{
    pump([
        gulp.src( sources , { read : false } ) ,
        jsdoc( config.docs , done )
    ] , done );
};

// Themes : Cerulean, Cosmo, Cyborg, Flatly,
//          Journal, Lumen, Paper, Readable,
//          Sandstone, Simplex, Slate, Spacelab, Superhero, United, Yeti

