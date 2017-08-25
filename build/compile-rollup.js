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
import yargs        from 'yargs' ;

import config from '../config.json' ;
import setting from '../package.json' ;

var cache ;

var argv   = yargs.argv ;
var colors = util.colors ;
var log    = util.log ;

/**
 * If not null, the default build library is 'vegas'. Use the library settings with the values : 'vegas' or 'molecule'.
 * You can use the dot notation to target a specific build, ex: --library molecule.
 */
var build = config.vegas ;
if( argv && argv.library && argv.library in config)
{
    log( colors.yellow( "Builds with the '" + argv.library + "' settings" ) );
    build = config[argv.library] ;
}

export var roll = ( done ) =>
{
    return rollup
    ({
        moduleName : build.name ,
        entry      : build.entry ,
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
        cache = build.cache ? bundle : null ;
    })
    .pipe( source( build.file + '.js' ) )
    .pipe( header( build.header , { version : setting.version } ) )
    .pipe( gulp.dest( build.output ) );
}