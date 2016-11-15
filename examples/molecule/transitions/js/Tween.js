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
    var molecule = vegas.molecule ; // jshint ignore:line

    var Tween = molecule.transitions.Tween ;

    // ----- behaviors

    var change = function( tween )
    {
        trace( 'progress ' + core.dump(tween.target) ) ;
        render() ;
    }

    var finish = function( tween )
    {
        trace( 'finish' ) ;
        tween.duration = 120 ;
        tween.from = null ;
        tween.to   = tween.to === to ? from : to ;
        tween.run() ;
    }

    var start = function()
    {
        trace( 'start' ) ;
    }

    // ----- initialize

    var canvas  = document.getElementById('canvas') ;
    var context = canvas.getContext('2d');

    canvas.width  = 800;
    canvas.height = 640;

    var color   = '#FF0000' ;
    var radius  = 25;

    var from    = { x : 100 , y : 100 } ;
    var to      = { x : 500 , y : 400 } ;
    var target  = { x : 0   , y : 0 } ;

    var easings = null ;

    //easings = { x : molecule.easings.backIn     , y : molecule.easings.backOut  } ;
    // easings = { x : molecule.easings.backOut   , y : molecule.easings.backIn  } ;
    // easings = { x : molecule.easings.circularOut    , y : molecule.easings.circularIn  } ;
    // easings = { x : molecule.easings.bounceOut , y : molecule.easings.bounceIn } ;
    easings = { x : molecule.easings.sineOut   , y : molecule.easings.sineIn   } ;

    var tween = new Tween
    ({
        duration : 48 ,
        easing   : molecule.easings.backOut,
        easings  : easings,
        from     : from ,
        target   : target ,
        to       : to
    }) ;

    //tween.easing = molecule.easings.cubicOut ;
    //tween.easing = molecule.easings.elasticOut ;
    //tween.easing = molecule.easings.sineOut ;

    //tween.fps = 24  ; // use the system.process.Timer class
    tween.fps = NaN ; // Use the system.process.FrameTimer

    //tween.looping = true ;

    tween.finishIt.connect( finish ) ;
    tween.changeIt.connect( change ) ;
    tween.startIt.connect( start ) ;

    // ----- render

    var render = function()
    {
        var width  = canvas.width ;
        var height = canvas.height ;

        context.clearRect(0, 0, width, height);

        context.fillStyle = '#333333' ;
        context.fillRect(0, 0, width, height );

        context.beginPath();
        context.arc( target.x , target.y, radius, 0, Math.PI * 2, false);
        context.closePath();
        context.fillStyle = color ;
        context.fill();
    }

    render() ;

    tween.run() ;
}


