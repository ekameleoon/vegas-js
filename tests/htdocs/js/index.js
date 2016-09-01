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

    var start = function( action )
    {
        trace( "start: " + action ) ;
    };

    var batch = new system.process.BatchTask() ;

    batch.add( do1 ) ;
    batch.add( do2 ) ;

    batch.verbose = true ;

    trace( 'batch   : ' + batch.toString(true) ) ;
    trace( 'running : ' + batch.running ) ;
    trace( 'length  : ' + batch.length ) ;

    batch.finishIt.connect(finish) ;
    batch.startIt.connect(start) ;

    batch.run() ;

})( vegas );

