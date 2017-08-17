"use strict" ;

import babel        from 'rollup-plugin-babel' ;
import babelrc      from 'babelrc-rollup';
import cleanup      from 'rollup-plugin-cleanup';
import gulp         from 'gulp' ;
import header       from 'gulp-header' ;
import includePaths from 'rollup-plugin-includepaths';
import replace      from 'rollup-plugin-replace';
import rollup       from 'rollup-stream' ;
import source       from 'vinyl-source-stream' ;
import util         from 'gulp-util' ;

import config  from '../config.json' ;
import setting from '../package.json' ;

var cache ;

var colors = util.colors ;
var log    = util.log ;

export var roll = ( done ) =>
{
    return rollup
    ({
        moduleName : config.name ,
        entry      : config.entry ,
        format     : 'umd' ,
        sourceMap  : false ,
        useStrict  : true ,
        cache      : cache ,
        globals    : {},
        plugins    :
        [
            replace
            ({
                delimiters : [ '<@' , '@>' ] ,
                values     :
                {
                    NAME        : setting.name ,
                    DESCRIPTION : setting.description ,
                    HOMEPAGE    : setting.homepage ,
                    LICENSE     : setting.license ,
                    VERSION     : setting.version
                }
            }),
            includePaths
            ({
                include : {},
                paths   : [ './src/' ] ,
                external   : [],
                extensions : [ '.js' ]
            }) ,
            babel
            (
                babelrc( { addExternalHelpersPlugin : true } )
            ),
            cleanup()
        ]
    })
    .once('error', ( error ) =>
    {
        log( colors.magenta( `${error.stack}` ) );
        done() ;
    })
    .once('bundle', function( bundle )
    {
        cache = config.cache ? bundle : null ;
    })
    .pipe( source( config.name + '.js' ) )
    .pipe( header( config.header , { version : setting.version } ) )
    .pipe( gulp.dest( config.output ) );
}