/* globals vegas */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

// use the skipHello method to skip the vegas library prompt message.
// vegas.skipHello() ;

window.onload = function()
{
    var global   = vegas.global ; // jshint ignore:line
    var trace    = vegas.trace  ; // jshint ignore:line
    var core     = vegas.core   ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line

    trace( "> version : " + vegas.version ) ;
}