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

var isAlphaOrDigit = core.chars.isAlphaOrDigit ;

trace( isAlphaOrDigit( '!' ) ) ;
trace( isAlphaOrDigit( 'A' ) ) ;
trace( isAlphaOrDigit( 'a' ) ) ;
trace( isAlphaOrDigit( '1' ) ) ;