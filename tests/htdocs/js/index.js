/* globals vegas*/
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

var global = vegas.global ; // jshint ignore:line
var trace  = vegas.trace  ; // jshint ignore:line
var core   = vegas.core   ; // jshint ignore:line
var system = vegas.system ; // jshint ignore:line

var forEach = core.objects.forEach ;

var object = { one:1 , two:2 , three:3 , four:4 , five:5 } ;

var action = function( value , key , ref )
{
    trace( "key:" + key + " value:" + value ) ;
    return value ;
}

forEach( object , action ) ;

trace( "----" ) ;

forEach( object , action, null, 3 ) ;

trace( "----" ) ;

forEach( [1,2,3,4] , action ) ; // use the Array.forEach method over Array objects.