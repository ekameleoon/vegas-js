/* jshint node: true */
/*jshint globalstrict: true*/
/*jslint unused: false */
"use strict" ;

var version = '1.0.0' ;

var babel  = require('rollup-plugin-babel') ;
var gulp   = require('gulp');
var pump   = require('pump');
var rename = require('gulp-rename') ;
var rollup = require('gulp-rollup');
var uglify = require("gulp-uglify");
var util   = require("gulp-util");

var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload') ;

var log = util.log ;

log( 'Builds the VEGAS library' ) ;

var name    = 'vegas' ;
var sources = './src/**/*.js' ;
var entry   = './src/index.js' ;
var output  = './bin' ;

var globals =
{
    core   : 'core',
    system : 'system',
    trace  : 'trace'
};

// ------------ VEGAS

gulp.task('vegas-compile', function( done )
{
    pump
    ([
        gulp.src( sources ) ,
        rollup
        ({
            moduleName : name ,
            entry      : entry ,
            banner     : '/* VEGAS version ' + version + ' */' ,
            footer     : '/* follow me on Twitter! @ekameleon */' ,
            format     : 'umd' ,
            sourceMap  : true ,
            useStrict  : true ,
            globals    : globals,
            plugins :
            [
                babel
                ({
                    babelrc : true ,
                    presets : [ 'es2015-rollup' ],
                    exclude : 'node_modules/**'
                })
            ]
        }),
        rename( name + '.js' ),
        gulp.dest( output )
    ],
    done
    );
});

gulp.task ('vegas-compress', function( done )
{
    pump([
        gulp.src( [ output + '/' + name + '.js' ] ) ,
        uglify(),
        rename( name + '.min.js'),
        gulp.dest( output ) ,
        //livereload()
    ] , done );
});

gulp.task ('vegas-map', function( done )
{
    pump([
        gulp.src( [ output + '/' + name + '.min.js' ] ) ,
        sourcemaps.init() ,
        rename( name + '.min.js.map'),
        sourcemaps.write() ,
        gulp.dest( output ) ,
    ] , done );
});

var tasks = gulp.series( 'vegas-compile' , 'vegas-compress' ) ;

gulp.task( 'vegas-save' , tasks ) ;

// ------------ watch

gulp.task( 'watch', function()
{
    livereload.listen();
    gulp.watch( 'src/js/**/*.js', gulp.series( 'vegas-save' ) );
});

// ------------ default

gulp.task( 'default', tasks );

