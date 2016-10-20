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

var dump = core.dump ;
var rotate = core.arrays.rotate ;

var array = ["l","o","v","e"] ;

trace( dump( rotate( array ,  1 ) ) ) ; // ["e","l","o","v"]
trace( dump( rotate( array , -1 ) ) ) ; // ["l","o","v","e"]
trace( dump( rotate( array , -1 ) ) ) ; // ["o","v","e","l"]
trace( dump( rotate( array ,  3 ) ) ) ; // ["v","e","l","o"]