/* jshint node: true */
"use strict" ;

import babel        from 'rollup-plugin-babel' ;
import babelrc      from 'babelrc-rollup';
import cleanup      from 'rollup-plugin-cleanup';
import gulp         from 'gulp' ;
import header       from 'gulp-header' ;
import includePaths from 'rollup-plugin-includepaths';
import pump         from 'pump' ;
import rename       from 'gulp-rename';
import replace      from 'rollup-plugin-replace';
import rollup       from 'gulp-rollup' ;

import config from '../config.json' ;
import { version } from './version.js' ;

export var roll = ( done ) =>
{
    pump
    (
        [
            gulp.src( [ './src/**/*.js' ] ) ,
            rollup
            ({
                moduleName : config.name ,
                entry      : './src/index.js' ,
                format     : 'umd' ,
                sourceMap  : 'inline' ,
                useStrict  : true ,
                globals    :
                {
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
                            addExternalHelpersPlugin : true
                        })
                    ),
                    cleanup()
                ]
            }),
            rename( config.name + ".js" ) ,
            header( config.header , { version : version } ) ,
            gulp.dest( config.output )
        ],
        done
    );
}