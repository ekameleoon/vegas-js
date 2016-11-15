/* globals vegas */
"use strict" ;

if( !vegas )
{
    throw new Error("The VEGAS library is not found.") ;
}

var global   = vegas.global ; // jshint ignore:line
var trace    = vegas.trace  ; // jshint ignore:line
var core     = vegas.core   ; // jshint ignore:line
var system   = vegas.system ; // jshint ignore:line
var molecule = vegas.molecule ; // jshint ignore:line

var backOut   = molecule.easings.backOut ;
var TweenUnit = molecule.transitions.TweenUnit ;

var finish = function()
{
    trace( 'finish' ) ;
}

var progress = function( action )
{
    trace( 'progress ' + action.position ) ;
}

var start = function()
{
    trace( 'start' ) ;
}

var tween = new TweenUnit( backOut , 24 ) ;

tween.finishIt.connect( finish ) ;
tween.progressIt.connect( progress ) ;
tween.startIt.connect( start ) ;

trace( tween.nextFrame() ) ;
