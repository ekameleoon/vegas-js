/*globals vegas */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

var global = vegas.global ; // jshint ignore:line
var trace  = vegas.trace  ; // jshint ignore:line
var core   = vegas.core   ; // jshint ignore:line
var system = vegas.system ; // jshint ignore:line

var BooleanRule = system.rules.BooleanRule ;
var Equals      =  system.rules.Equals ;

var e ;

///// Compares objects.

e = new Equals( 1 , 1 ) ;
trace( e.eval() ) ; // true

e = new Equals( 1 , 2 ) ;
trace( e.eval() ) ; // false

///// Compares Rule objects.

var cond1 = new BooleanRule( true  ) ;
var cond2 = new BooleanRule( false ) ;
var cond3 = new BooleanRule( true  ) ;

e = new Equals( cond1 , cond1 ) ;
trace( e.eval() ) ; // true

e = new Equals( cond1 , cond2 ) ;
trace( e.eval() ) ; // false

e = new Equals( cond1 , cond3 ) ;
trace( e.eval() ) ; // true

///// Compares Equatable objects.

var equals = function( o )
{
    return this.id === o.id ;
}

var o1 = { id:1 , equals:equals } ;
var o2 = { id:2 , equals:equals } ;
var o3 = { id:1 , equals:equals } ;

e = new Equals( o1 , o1 ) ;
trace( e.eval() ) ; // true

e = new Equals( o1 , o2 ) ;
trace( e.eval() ) ; // false

e = new Equals( o1 , o3 ) ;
trace( e.eval() ) ; // true