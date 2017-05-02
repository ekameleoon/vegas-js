/* globals vegas */
/*jshint bitwise: false*/
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

window.onload = function()
{
    var core = vegas.core ; // jshint ignore:line

    var div = document.createElement('div') ;

    console.log( core.dom.isElement( div ) ) ;
    console.log( core.dom.isElement( {} ) ) ;
    console.log( core.dom.isElement( null ) ) ;
}