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
    var graphics = vegas.graphics ; // jshint ignore:line
    var system   = vegas.system ; // jshint ignore:line

    var Point     = graphics.geom.Point ;
    var TweenUnit = system.transitions.TweenUnit ;

    // ----- behaviors

    var change = function( tween )
    {
        position = origin.clone() ;
        position.rotate( Math.PI * 2 * tween.position , center ) ;
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

    var center   = new Point(400,320) ;
    var origin   = new Point(560,320) ;
    var position = origin.clone() ;

    var canvas  = document.getElementById('canvas') ;
    var context = canvas.getContext('2d');
    var tween   = new TweenUnit( core.easings.backOut , 120 ) ;

    //tween.fps = 24  ; // use the system.process.Timer class
    tween.fps = NaN ; // Use the system.process.FrameTimer

    tween.looping = true ;

    tween.finishIt.connect( finish ) ;
    tween.changeIt.connect( change ) ;
    tween.startIt.connect( start ) ;

    canvas.width  = 800;
    canvas.height = 640;

    var color   = '#FF0000' ;
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
        context.arc( position.x, position.y, radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = color ;
        context.fill();
    }

    render() ;

    // ----- run

    tween.run() ;
}


