/* jshint node: true */
"use strict" ;

import babel  from 'rollup-plugin-babel' ;
import gulp   from 'gulp' ;
import mocha  from 'gulp-mocha' ;
import pump   from 'pump' ;
import rename from 'gulp-rename' ;
import rollup from 'gulp-rollup' ;
import uglify from 'gulp-uglify' ;
import util   from 'gulp-util' ;

import includePaths from 'rollup-plugin-includepaths';

var name     = 'vegas' ;
var version  = '1.0.0' ;
var sources  = './src/**/*.js' ;
var entry    = './src/index.js' ;
var output   = './bin' ;
var reporter = 'spec' // spec, dot, landing, dot, nyan, list
var watching = false ;

var colors = util.colors ;
var log    = util.log ;

let globals =
{
    chai   : 'chai',
    core   : 'core',
    system : 'system',
    global : 'global' ,
    trace  : 'trace'
};

let includePathOptions =
{
    include    : {},
    external   : ['chai'],
    extensions : ['.js']
};

var compile = ( done ) =>
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
                sourceMap  : false ,
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
}

var compress = ( done ) =>
{
    pump([
        gulp.src( [ output + '/' + name + '.js' ] ) ,
        uglify(),
        rename( name + '.min.js'),
        gulp.dest( output )
    ] , done );
}

var unittest = ( done ) =>
{
    pump
    ([
        gulp.src( [ sources , './tests/**/*.js' ] ) ,
        rollup
        ({
            moduleName : name ,
            entry      : './tests/main.js' ,
            format     : 'umd' ,
            sourceMap  : 'inline' ,
            useStrict  : true ,
            globals    : globals,
            plugins    :
            [
                includePaths( includePathOptions ) ,
                babel
                ({
                    babelrc : false,
                    presets : ['es2015-rollup'],
                    exclude : 'node_modules/**' ,
                    plugins :
                    [
                        "external-helpers"
                    ]
                })
            ]
        }),
        mocha
        ({
            reporter : reporter
        })
        .on( 'error' , onError )
    ], done ) ;
}

function onError( error )
{
    log( colors.magenta( error.toString() ) );

    if (watching)
    {
      this.emit('end');
    }
    else
    {
      process.exit(1);
    }
}

// ------------ TASKS

gulp.task( 'watch', () =>
{
    watching = true;
    gulp.watch( ['src/**/*.js' , './tests/**/*.js' ], gulp.series( unittest , compile , compress ) );
});

gulp.task( 'watch-test', () =>
{
    watching = true;
    gulp.watch( ['src/**/*.js' , './tests/**/*.js' ], gulp.series( unittest ) );
});

gulp.task( 'test', gulp.series( unittest , 'watch-test') );

gulp.task( 'default', gulp.series
(
    unittest , compile , compress , 'watch'
));

// ------------