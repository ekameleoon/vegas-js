/* jshint node: true */
"use strict" ;

// --------- Imports

import babel        from 'rollup-plugin-babel' ;
import babelrc      from 'babelrc-rollup';
import browserify   from 'browserify' ;
import cleanup      from 'rollup-plugin-cleanup';
import gulp         from 'gulp' ;
import header       from 'gulp-header' ;
import pump         from 'pump' ;
import replace      from 'rollup-plugin-replace';
import source       from 'vinyl-source-stream';

import config from '../config.json' ;
import { version } from './version.js' ;

export var brow = ( done ) =>
{
    pump
    (
        [
            browserify
            ({
                debug         : config.debug,
                detectGlobals : true,
                entries       : config.entry ,
                fullPaths     : true ,
                insertGlobals : true ,
                standalone    : config.name
            })
            .transform( "rollupify" ,
            {
                config :
                {
                    moduleName : config.name ,
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
                        (
                            babelrc
                            ({
                                addExternalHelpersPlugin : true
                            })
                        ),
                        cleanup()
                    ]
                }
            }).bundle() ,
            source( config.name + '.js' ) ,
            header( config.header , { version : version } ) ,
            gulp.dest( config.output )
        ],
        done
    );
}