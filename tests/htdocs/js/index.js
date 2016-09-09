/* globals vegas */
"use strict" ;

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

var time = function( action )
{
    trace( action + " count: " + action.currentCount + " / " + action.repeatCount ) ;
    if ( action.currentCount === 5 )
    {
        action.stop() ;
        trace( "timer stopped:" + action.stopped ) ;
        action.resume() ;
    }
}

var action = new system.process.Timer( 1000 , 1  ) ;
//var action = new system.process.Timer( 1 , 10 , true ) ;

action.finishIt.connect( finish ) ;
action.timerIt.connect( time ) ;
action.resumeIt.connect( resume ) ;
action.startIt.connect( start ) ;
action.stopIt.connect( stop ) ;

action.run() ;