/* jshint node: true */
"use strict" ;

// --------- Imports

import config from './package.json' ;

import babel        from 'rollup-plugin-babel' ;
import babelrc      from 'babelrc-rollup';
import browserify   from 'browserify' ;
import cleanup      from 'rollup-plugin-cleanup';
import gulp         from 'gulp' ;
import header       from 'gulp-header' ;
import includePaths from 'rollup-plugin-includepaths';
import jsdoc        from 'gulp-jsdoc3' ;
import mocha        from 'gulp-mocha' ;
import pump         from 'pump' ;
import rename       from 'gulp-rename' ;
import replace      from 'rollup-plugin-replace';
import rollup       from 'gulp-rollup' ;
import source       from 'vinyl-source-stream';
import uglify       from 'gulp-uglify' ;
import util         from 'gulp-util' ;
import yargs        from 'yargs' ;

// --------- Initialize

var argv   = yargs.argv ;
var colors = util.colors ;
var debug  = false ;
var log    = util.log ;

var name     = 'vegas' ;
var version  = config.version ;

var entries  = [ './src/index.js' ] ; // , './libs/index.js'
var output   = './bin' ;
var watching = false ;

// --------- Documentation

/**
 * Node Module : https://www.npmjs.com/package/jaguarjs-jsdoc / https://www.npmjs.com/package/gulp-jsdoc3
 * Documentation : http://usejsdoc.org/
 */
var docs =
{
    "tags" :
    {
        "allowUnknownTags" : true
    } ,
    "source":
    {
        "includePattern": ".+\\.js(doc)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "opts" :
    {
        "recurse"     : true,
        "destination" : "./docs/bin" ,
        "tutorials"   : "./docs/tutorials"
    },
    "plugins":
    [
        "plugins/markdown"
    ],
    "templates":
    {
        "footer"         : "<p align='center'>VEGAS JS - by <strong><a href='http://www.ooopener.com'>Ooopener</a></strong></p>",
        "systemName"     : "VEGAS JS",
        "cleverLinks"    : true,
        "monospaceLinks" : true,
        "analytics"      : { "ua" : "UA-87950715-1" , "domain":"auto" } ,
        "default"        :
        {
            "outputSourceFiles" : true
        },
        "path"            : "ink-docstrap",
        "theme"           : "simplex", // Cerulean, Cosmo, Cyborg, Flatly, Journal, Lumen, Paper, Readable, Sandstone, Simplex, Slate, Spacelab, Superhero, United, Yeti
        "navType"         : "vertical",
        "inverseNav"      : true,
        "linenums"        : true,
        "collapseSymbols" : false ,
        "dateFormat"      : "YYYY Do MMMM, h:mm:ss a",
        "syntaxTheme"     : "default" // dark or default
    }
}

// --------- Unit tests

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
var reporters = ['spec', 'dot', 'landing', 'dot', 'nyan', 'list' , 'mochawesome' ] ;

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

// --------- Actions

var compile = ( done ) =>
{
    pump
    (
        [
            browserify
            ({
                debug         : debug,
                detectGlobals : true,
                entries       : entries ,
                fullPaths     : true ,
                insertGlobals : true ,
                standalone    : name
            })
            .transform( "rollupify" ,
            {
                config :
                {
                    moduleName : name ,
                    format     : 'umd' ,
                    sourceMap  : false ,
                    useStrict  : true ,
                    plugins :
                    [
                        replace
                        ({
                            delimiters : [ '<@' , '@>' ] ,
                            values     : { VERSION : version }
                        }),
                        babel
                        ({
                            babelrc : false,
                            presets : ['es2015-rollup'],
                            exclude : 'node_modules/**' ,
                            plugins : [ "external-helpers"]
                        }),
                        cleanup()
                    ]
                }
            }).bundle() ,
            source( name + '.js' ) ,
            header( '/* VEGAS JS - version ${version} - follow me on Twitter! @ekameleon */\n', { version : version } ) ,
            gulp.dest( output )
        ],
        done
    );
}

var compress = ( done ) =>
{
    pump([
        gulp.src( [ output + '/' + name + '.js' ] ) ,
        uglify(),
        rename( name + '.min.js'),
        header( '/* VEGAS JS - version ${version} - follow me on Twitter! @ekameleon */\n', { version : version } ) ,
        gulp.dest( output )
    ] , done );
}

var doc = ( done ) =>
{
    pump([
        gulp.src(['README.md' , './src/**/*.js' ] , {read: false} ) , // , './libs/**/*.js'
        jsdoc( docs , done )
    ] , done );
};

var unittest = ( done ) =>
{
    pump
    ([
        gulp.src( [ './src/**/*.js' , './tests/**/*.js' ] ) ,
        rollup
        ({
            moduleName : name ,
            entry      : './tests/main.js' ,
            format     : 'umd' ,
            sourceMap  : 'inline' ,
            useStrict  : true ,
            globals    :
            {
                chai     : 'chai',
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
                    babelrc
                    ({
                        addExternalHelpersPlugin : false
                    })
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
            if( watching )
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

var test = () =>
{
    watching = true;
    gulp.watch
    (
        ['src/**/*.js' , './tests/**/*.js' ] ,
        gulp.series( unittest )
    );
}

var watch = () =>
{
    watching = true;
    gulp.watch
    (
        ['src/**/*.js' , './tests/**/*.js' ] ,
        gulp.series( unittest , compile , compress )
    );
}

// --------- Tasks

gulp.task( 'default' , gulp.series( unittest , compile , compress ) ) ;
gulp.task( 'build'   , gulp.series( compile , compress ) ) ;
gulp.task( 'doc'     , gulp.series( doc ) ) ;
gulp.task( 'test'    , gulp.series( unittest , test ) ) ;
gulp.task( 'ut'      , gulp.series( unittest ) ) ;
gulp.task( 'watch'   , watch ) ;