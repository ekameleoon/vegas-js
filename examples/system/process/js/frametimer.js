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

    var finish = function( action )
    {
        trace( action + " finish" ) ;
    }

    var progress = function( action )
    {
        trace( action + " progress" ) ;
        if( count++ === 100 )
        {
            action.stop() ;
        }
    }

    var resume = function( action )
    {
        trace( action + " resume" ) ;
    }

    var start = function( action )
    {
        trace( action + " start" ) ;
    }

    var stop = function( action )
    {
        trace( action + " stop" ) ;
    }

    var action = new system.process.FrameTimer() ;
    var count  = 0 ;

    action.finishIt.connect( finish ) ;
    action.progressIt.connect( progress ) ;
    action.resumeIt.connect( resume ) ;
    action.startIt.connect( start ) ;
    action.stopIt.connect( stop ) ;

    action.run() ;
}