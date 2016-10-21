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

// var model = new system.models.MemoryModel();
//
// var beforeChanged = function( value , model )
// {
//     trace( "[-] before:" + value + " current:" + model.current + " size:" + model.size ) ;
// }
//
// var changed = function( value , model )
// {
//     trace( "[+] change:" + value + " current:" + model.current + " size:" + model.size ) ;
// }
//
// var cleared = function( model )
// {
//     trace( "[x] clear current:" + model.current + " size:" + model.size ) ;
// }
//
// model.beforeChanged.connect( beforeChanged ) ;
// model.changed.connect( changed ) ;
// model.cleared.connect( cleared ) ;
//
// trace( "-- history" ) ;
//
// model.current = "home" ;
// model.current = "near" ;
// model.current = "search" ;
// model.current = "place" ;
// model.current = "events" ;
// model.current = "map" ;
// model.current = "test" ;
//
// trace( "-- back" ) ;
//
// trace( "back() : " + model.back() ) ;
//
// trace( "-- backTo(3)" ) ;
//
// trace( "backTo(3) : " + model.backTo( 3 ) ) ;
//
// trace( "-- home" ) ;
//
// trace( 'home() : ' + model.home() ) ;
//
// trace( "--" ) ;
//
// model.clear() ;