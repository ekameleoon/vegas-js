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

var IsNumber = system.rules.IsNumber ;

trace( (new IsNumber( 0 )).eval() ) ; // true
trace( (new IsNumber( 1 )).eval() ) ; // true
trace( (new IsNumber( NaN )).eval() ) ; // true

trace( (new IsNumber( true )).eval() ) ; // false
trace( (new IsNumber( null )).eval() ) ; // false
