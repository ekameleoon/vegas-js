/* jshint node: true */
/*jshint globalstrict: true*/
"use strict" ;

import babel  from 'rollup-plugin-babel' ;
import gulp   from 'gulp' ;
import mocha  from 'gulp-mocha' ;
import pump   from 'pump' ;
import rename from 'gulp-rename' ;
import rollup from 'gulp-rollup' ;
import uglify from 'gulp-uglify' ;

var name    = 'vegas' ;
var version = '1.0.0' ;
var sources = './src/**/*.js' ;
var entry   = './src/index.js' ;
var output  = './bin' ;

var reporter = 'spec' // spec, dot, landing, dot, nyan, list

var globals =
{
    chai   : 'chai' ,
    core   : 'core',
    system : 'system',
    global : 'global' ,
    trace  : 'trace'
};

// ------------ VEGAS

gulp.task('compile', ( done ) =>
{
    pump
    (
        [
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
                        babelrc : false,
                        presets : ['es2015-rollup'],
                        exclude : 'node_modules/**' ,
                        plugins : [ "external-helpers"]
                    })
                ]
            }),
            rename( name + '.js' ),
            gulp.dest( output )
        ],
        done
    );
});

gulp.task ('compress', ( done ) =>
{
    pump([
        gulp.src( [ output + '/' + name + '.js' ] ) ,
        uglify(),
        rename( name + '.min.js'),
        gulp.dest( output )
    ] , done );
});

gulp.task( 'test', ( done ) =>
{
    pump
    ([
        gulp.src( [ sources , './tests/**/*.js' ] ) ,
        rollup
        ({
            moduleName : name ,
            entry      : './tests/main.js' ,
            format     : 'umd' ,
            sourceMap  : true ,
            useStrict  : true ,
            globals    : globals,
            plugins :
            [
                babel
                ({
                    babelrc : false,
                    presets : ['es2015-rollup'],
                    exclude : 'node_modules/**' ,
                    plugins : [ "external-helpers"]
                })
            ]
        }),
        mocha
        ({
            reporter : reporter
        })
    ] , done )
});

gulp.task( 'watch', function()
{
    gulp.watch( 'src/**/*.js', gulp.series( 'compile' , 'compress' ) );
});

// ------------ default

gulp.task( 'default', gulp.series
(
    'compile' , 'compress' , 'watch'
));

