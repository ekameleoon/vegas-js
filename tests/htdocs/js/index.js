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

var model = new system.models.ChangeModel();

var beforeChanged = function( value , model )
{
    trace( "before:" + value + " current:" + model.current ) ;
}

var changed = function( value , model )
{
    trace( "change:" + value + " current:" + model.current ) ;
}

var cleared = function( model )
{
    trace( "clear current:" + model.current ) ;
}

model.beforeChanged.connect( beforeChanged ) ;
model.changed.connect( changed ) ;
model.cleared.connect( cleared ) ;

model.current = "hello" ;
model.current = "world" ;
model.current = null ;
model.current = "test" ;

model.clear() ;