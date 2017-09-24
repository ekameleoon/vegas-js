/* globals vegas */
"use strict" ;

window.onload = function()
{
    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    var global = vegas.global ; // jshint ignore:line
    var trace  = vegas.trace  ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line

    var do1 = new system.process.Do() ;
    var do2 = new system.process.Do() ;

    do1.something = function()
    {
        trace( "do1 something" ) ;
    }

    do2.something = function()
    {
        trace( "do2 something" ) ;
    }

    var finish = function( action )
    {
        trace( "finish: " + action ) ;
    };

    var progress = function( action )
    {
        trace( "progress: " + action ) ;
    };

    var start = function( action )
    {
        trace( "start: " + action ) ;
    };

    var chain = new system.process.Chain() ;

    chain.finishIt.connect(finish) ;
    chain.progressIt.connect(progress) ;
    chain.startIt.connect(start) ;

    chain.add( do1 , 0 ) ;
    chain.add( do2 , 2 , true) ;

    chain.verbose = true ;

    trace('--------- #1') ;

    trace( 'chain   : ' + chain.toString(true) ) ;
    trace( 'running : ' + chain.running ) ;
    trace( 'length  : ' + chain.length ) ;

    trace('---------') ;

    chain.run() ;

    trace('--------- #2') ;

    trace( 'chain   : ' + chain.toString(true) ) ;
    trace( 'running : ' + chain.running ) ;
    trace( 'length  : ' + chain.length ) ;

    trace('---------') ;

    chain.run() ;
}