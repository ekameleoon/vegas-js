/* jshint node: true */
"use strict" ;

import gulp    from 'gulp' ;
import header  from 'gulp-header' ;
import pump    from 'pump' ;
import webpack from 'webpack-stream';

import config from '../config.json' ;
import { version } from './version.js' ;

export var pack = ( done ) =>
{
    pump
    (
        [
            gulp.src( config.entry ) ,
            webpack
            ({
                module :
                {
                    loaders :
                    [
                        {
                            test    : /\.js$/,
                            exclude : /(node_modules|bower_components)/,
                            loader  : 'babel-loader',
                            query   : { presets: ['es2015'] }
                        },
                        {
                            test   : /\.js$/,
                            loader : 'webpack-replace',
                            query  : { search: '<@VERSION@>' , replace : version }
                        }
                     ]
                },
                output:
                {
                    filename : config.name + '.js' ,
                    path     : __dirname,
                    library  : 'vegas'
                }
            }),
            header( config.header , { version : version } ) ,
            gulp.dest( config.output )
        ],
        done
    );
}