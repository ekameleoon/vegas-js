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

    console.log( core.dom.isHTMLElement( div  ) ) ; // true
    console.log( core.dom.isHTMLElement( svg  ) ) ; // false
    console.log( core.dom.isHTMLElement( null ) ) ; // false
}