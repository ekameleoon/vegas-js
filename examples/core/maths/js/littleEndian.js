/* globals vegas */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

window.onload = function()
{
    var trace = vegas.trace  ; // jshint ignore:line
    var core  = vegas.core   ; // jshint ignore:line

    trace( core.maths.littleEndian ) ;
}