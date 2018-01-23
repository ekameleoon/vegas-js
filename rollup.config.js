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

let setting ;
try
{
    switch( process.env.LIB )
    {
        case 'molecule' :
        {
            setting = molecule ;
            break ;
        }
        default :
        {
            setting = vegas ;
        }
    }
}
catch( e ) {}

let mode = 'dev' ;
let file = setting.output + setting.file ;

try
{
    switch( process.env.MODE )
    {
        case 'prod' :
        {
            mode = 'prod' ;
            file += '.min.js' ;
            break ;
        }
        default :
        {
            mode = 'dev' ;
            file += '.js' ;
        }
    }
}
catch (e) {}

const libraries =
{
    'core'     : path.resolve( __dirname, './src/core/' ) ,
    'graphics' : path.resolve( __dirname, './src/graphics/' ) ,
    'molecule' : path.resolve( __dirname, './src/molecule/' ) ,
    'polyfill' : path.resolve( __dirname, './src/polyfill/' ) ,
    'screens'  : path.resolve( __dirname, './src/screens/' ) ,
    'system'   : path.resolve( __dirname, './src/system/' ) ,
    '@vegas'   : path.resolve( __dirname, './src/' )
}

const plugins =
[
    alias( libraries ),
    babel
    ({
        exclude : 'node_modules/**' ,
        babelrc : false ,
        presets : [ [ 'env' , { 'modules' : false } ] ] ,
        plugins : [ 'external-helpers' ]
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
    cleanup()
];

if( mode === 'prod' )
{
    plugins.push( uglify() )
}

plugins.push( license({ banner : setting.header }) ) ;

export default {
    input  : setting.entry ,
    output :
    {
        name   : setting.bundle ,
        file   : file  ,
        format : 'umd' ,
        sourcemap : setting.sourcemap && (mode === 'dev') ,
        strict : true
    },
    watch  :
    {
        exclude : 'node_modules/**'
    },
    plugins: plugins
} ;
