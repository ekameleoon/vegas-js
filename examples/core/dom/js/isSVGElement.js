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

    var div = document.createElement( "div" ) ;
    var svg = document.createElementNS( "http://www.w3.org/2000/svg" , "svg" ) ;

    console.log( core.dom.isSVGElement( svg ) ) ;
    console.log( core.dom.isSVGElement( div ) ) ;
    console.log( core.dom.isSVGElement( {} ) ) ;
    console.log( core.dom.isSVGElement( null ) ) ;
}