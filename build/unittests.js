/* jshint node: true */
"use strict" ;

// --------- Imports

import babel        from 'rollup-plugin-babel' ;
import babelrc      from 'babelrc-rollup';
import cleanup      from 'rollup-plugin-cleanup';
import gulp         from 'gulp' ;
import includePaths from 'rollup-plugin-includepaths';
import mocha        from 'gulp-mocha' ;
import pump         from 'pump' ;
import replace      from 'rollup-plugin-replace';
import rollup       from 'gulp-rollup' ;
import util         from 'gulp-util' ;
import yargs        from 'yargs' ;

import { version  } from './version.js' ;
import { watching } from './watch.js' ;

import config from '../config.json' ;

// --------- Initialize

var name   = config.name ;
var argv   = yargs.argv ;
var colors = util.colors ;
var log    = util.log ;

// --------- Arguments

/**
 * If not null, the default mocha entry is the /tests/main.js file.
 * You can use the dot notation to target a specific test entry, ex: --entry core.maths to use the /test/core/maths.js file.
 */
var entry = 'main' ;

if( argv && argv.entry )
{
    entry = argv.entry ;
    entry = entry.replace(/[.]/g, '/' ) ;
}

/**
 * If not null, trigger mocha to only run tests matching the given pattern which
 * is internally compiled to a RegExp.
 */
var match = null ; // ex: 'graphics' to test the package or 'graphics.Align' to test only this object

if( argv && argv.match )
{
    match = argv.match ;
}

/**
 * The reporters name of the unit tests : 'spec', 'dot', 'landing', 'dot', 'nyan', 'list'
 */
var reporters = config.reporters ;

var reporter = 'spec' ;
var reporterOptions = null ;

if( argv && argv.reporter && reporters.indexOf(argv.reporter) > -1 )
{
    reporter = argv.reporter ;
}

if( reporter === 'mochawesome' )
{
    reporterOptions =
    {
        reportDir    : './bin/tests',
        reportName   : 'index',
        reportTitle  : 'VEGAS JS - Unit tests',
        inlineAssets : true
    };
}

// --------- Unit tests

export var unittests = ( done ) =>
{
    pump
    ([
        gulp.src( [ './src/**/*.js' , './tests/**/*.js' ] ) ,
        rollup
        ({
            moduleName : name ,
            entry      : './tests/' + entry + '.js' ,
            format     : 'umd' ,
            sourceMap  : 'inline' ,
            useStrict  : true ,
            globals    :
            {
                chai     : 'chai',
                jsdom    : 'jsdom' ,
                core     : 'core',
                system   : 'system',
                global   : 'global',
                trace    : 'trace',
                validate : 'validate' ,
                version  : 'version'
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
                    external   : [ 'chai' ],
                    extensions : [ '.js' ]
                }) ,
                babel
                (
                    babelrc({ addExternalHelpersPlugin : true })
                ),
                cleanup()
            ]
        }),
        mocha
        ({
            reporter        : reporter ,
            reporterOptions : reporterOptions ,
            grep            : match ? match : null
        })
        .on( 'error' , function( error )
        {
            log( colors.magenta( error.toString() ) );
            if( watching.flag )
            {
                this.emit('end') ;
            }
            else
            {
                this.emit('end') ;
                process.exit(1);
            }
        } )
    ], done ) ;
}