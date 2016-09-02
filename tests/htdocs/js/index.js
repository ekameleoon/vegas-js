/* globals vegas */
( function( vegas )
{
    "use strict" ;

    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }


    var trace  = vegas.trace  ; // jshint ignore:line
    var system = vegas.system ; // jshint ignore:line
    var core   = vegas.core   ; // jshint ignore:line

    var do1 = new system.process.Do() ;
    var do2 = new system.process.Do() ;

    do1.something = function()
    {
        console.log( "do1 something" ) ;
    }

    do2.something = function()
    {
        console.log( "do2 something" ) ;
    }

    var finish = function( action )
    {
        trace( "finish: " + action ) ;
    };

    var progress = function( action )
    {
        trace( "progress: " + action.current ) ;
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

    trace('---------') ;

    trace( 'batch   : ' + chain.toString(true) ) ;
    trace( 'running : ' + chain.running ) ;
    trace( 'length  : ' + chain.length ) ;

    trace('---------') ;

    chain.run() ;

    trace('---------') ;

    chain.run() ;

})( vegas );

