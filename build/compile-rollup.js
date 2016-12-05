/* jshint node: true */
"use strict" ;

import babel        from 'rollup-plugin-babel' ;
import babelrc      from 'babelrc-rollup';
import cleanup      from 'rollup-plugin-cleanup';
import gulp         from 'gulp' ;
import header       from 'gulp-header' ;
import includePaths from 'rollup-plugin-includepaths';
//import pump         from 'pump' ;
import replace      from 'rollup-plugin-replace';
import rollup       from 'rollup-stream' ;
import source       from 'vinyl-source-stream' ;
import util         from 'gulp-util' ;

import config from '../config.json' ;
import { version } from './version.js' ;

var colors = util.colors ;
var log    = util.log ;

export var roll = ( done ) =>
{
    return rollup
    ({
        moduleName : config.name ,
        entry      : config.entry ,
        format     : 'umd' ,
        sourceMap  : false, // 'inline'
        useStrict  : true ,
        globals    :
        {
            core     : 'core',
            system   : 'system',
            global   : 'global',
            trace    : 'trace',
            validate : 'validate' ,
            version  : 'version' ,
            molecule : 'molecule'
        },
        plugins    :
        [
            replace
            ({
                delimiters : [ '<@' , '@>' ] ,
                values     : { VERSION : version }
            }),
            includePaths
            ({
                include    : {},
                paths      : [ './src/' , './libs/molecule/src/' ] ,
                external   : [ 'molecule' ],
                extensions : [ '.js' ]
            }) ,
            babel
            (
                babelrc( { addExternalHelpersPlugin : true } )
            ),
            cleanup()
        ]
    }).on('error', ( error ) =>
    {
        log( colors.magenta( `${error.stack}` ) );
        done() ;
    })
    .pipe( source( config.name + '.js' ) )
    .pipe( header( config.header , { version : version } ) )
    .pipe( gulp.dest( config.output ) );
}