/* globals vegas */
"use strict" ;

window.onload = function()
{
    if( !vegas )
    {
        throw new Error("The VEGAS library is not found.") ;
    }

    // ----- imports

    var global   = vegas.global ; // jshint ignore:line
    var trace    = vegas.trace  ; // jshint ignore:line
    var core     = vegas.core   ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line

    var TweenUnit = system.transitions.TweenUnit ;

    // ----- behaviors

    var change = function( tween )
    {
        trace( 'progress ' + tween.position ) ;
        render() ;
    }

    var finish = function()
    {
        trace( 'finish' ) ;
    }

    var start = function()
    {
        trace( 'start' ) ;
    }

    // ----- initialize

    var canvas  = document.getElementById('canvas') ;
    var context = canvas.getContext('2d');
    var tween   = new TweenUnit( core.easings.backOut , 48 ) ;

    //tween.easing = core.easings.cubicOut ;
    //tween.easing = core.easings.elasticOut ;
    //tween.easing = core.easings.sineOut ;

    //tween.fps = 24  ; // use the system.process.Timer class
    tween.fps = NaN ; // Use the system.process.FrameTimer

    //tween.looping = true ;

    tween.finishIt.connect( finish ) ;
    tween.changeIt.connect( change ) ;
    tween.startIt.connect( start ) ;

    canvas.width  = 800;
    canvas.height = 640;

    var color   = '#FF0000' ;
    var begin   = { x : 50  , y : 100 } ;
    var end     = { x : 500 , y : 400 } ;
    var radius  = 25;

    // ----- render

    var render = function()
    {
        var width  = canvas.width ;
        var height = canvas.height ;

        context.clearRect(0, 0, width, height);

        context.fillStyle = '#333333' ;
        context.fillRect(0, 0, width, height );

        context.beginPath();
        context.arc( begin.x + (tween.position * end.x) , begin.y + (tween.position * end.y), radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = color ;
        context.fill();
    }

    tween.run() ;
}


