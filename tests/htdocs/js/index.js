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

var Null = system.rules.Null ;

var cond ;

cond = new Null( undefined , true ) ;
trace( cond.eval() ) ; // false

cond = new Null( undefined ) ;
trace( cond.eval() ) ; // true

cond = new Null( null ) ;
trace( cond.eval() ) ; // true

cond = new Null( "hello" ) ;
trace( cond.eval() ) ; // false