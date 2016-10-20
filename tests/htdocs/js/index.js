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
var fuse = core.objects.fuse ;

var ar1 = [1,2,3,4] ;
var ar2 = [5,6,7,8] ;

fuse( ar1 , 2 , ar2 , 2 , 2 ) ;

trace( dump( ar2 ) ) ; // [5,6,3,4]