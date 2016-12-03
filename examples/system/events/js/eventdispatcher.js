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

    var Event = system.events.Event;
    var EventDispatcher = system.events.EventDispatcher;

    var click = function( event )
    {
        trace( "click: " + event ) ;
    };

    var dispatcher = new EventDispatcher() ;

    dispatcher.addEventListener( Event.CLICK , click ) ;

    dispatcher.dispatchEvent( new Event( Event.CLICK ) ) ;
}