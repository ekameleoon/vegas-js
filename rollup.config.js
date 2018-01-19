"use strict" ;

import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import cleanup from 'rollup-plugin-cleanup';
import license from 'rollup-plugin-license' ;
import path from 'path' ;
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

import pkg from './package.json' ;

import molecule from './build/molecule.config.json' ;
import vegas    from './build/vegas.config.json' ;

let dev = !process.env.prod ;
let minify = dev ? '' : '.min'  ;
let setting ;

switch( true )
{
    case !!process.env.molecule :
    {
        setting = molecule ;
        break ;
    }
    default :
    {
        setting = vegas ;
    }
}

export default
{
    input  : setting.entry ,
    output :
    {
        name   : setting.bundle ,
        file   : setting.output + setting.file + minify + '.js' ,
        format : 'umd' ,
        strict : true
    },
    sourcemap : false ,
    watch  :
    {
        exclude : 'node_modules/**'
    },
    plugins:
    [
        alias
        ({
            'core'     : path.resolve( __dirname, './src/core/' ) ,
            'graphics' : path.resolve( __dirname, './src/graphics/' ) ,
            'molecule' : path.resolve( __dirname, './src/molecule/' ) ,
            'polyfill' : path.resolve( __dirname, './src/polyfill/' ) ,
            'screens'  : path.resolve( __dirname, './src/screens/' ) ,
            'system'   : path.resolve( __dirname, './src/system/' ) ,
            '@vegas'   : path.resolve( __dirname, './src/' )
        }),
        babel
        ({
            exclude : 'node_modules/**' ,
            babelrc : false ,
            presets : [ [ "env" , { "modules" : false } ] ] ,
            plugins :
            [
                "external-helpers"
            ]
        }),
        replace
        ({
            delimiters : [ '<@' , '@>' ] ,
            values     :
            {
                NAME        : pkg.name ,
                DESCRIPTION : pkg.description ,
                HOMEPAGE    : pkg.homepage ,
                LICENSE     : pkg.license ,
                VERSION     : pkg.version
            }
        }),
        cleanup(),
        dev || uglify(),
        license({ banner : setting.header })
    ]
};