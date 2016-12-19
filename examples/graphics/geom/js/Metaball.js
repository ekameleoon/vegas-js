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

    var Circle    = graphics.geom.Circle ;
    var Rectangle = graphics.geom.Rectangle ;

    // ----- initialize

    var bgColor = '#333333' ;
    var color   = '#FF0000' ;

    var area   = new Rectangle( 0 , 0 , 340 , 260 ) ;
    var spot   = new Circle( area.x + (area.width/2) , area.y + (area.height / 2) , 60 ) ;

    var metaballs =
    [
        new Circle(  20 ,  20 , 10 ) ,
        new Circle(  70 ,  80 , 30 ) ,
        new Circle( 250 , 100 , 35 ) ,
        new Circle( 220 , 130 , 30 ) ,
        new Circle( 60  , 180 , 20 ) ,
        new Circle( 90  , 200 , 25 ) ,
        spot
    ];

    var canvas    = document.getElementById('canvas') ;
    var context   = canvas.getContext('2d');

    canvas.width  = area.width;
    canvas.height = area.height ;

    // ----- render

    var maxThreshold = 4 ;
    var minThreshold = 3 ;

    var cpt = 0 ;
    var i   = 0 ;
    var tx  = 0 ;
    var ty  = 0 ;

    var len = metaballs.length ;

    var render = function()
    {
        context.clearRect(0, 0, area.width, area.height );

        context.fillStyle = bgColor ;
        context.fillRect(0, 0, area.width, area.height );

        cpt = 0 ;

        for( tx = 0 ; tx < area.width ; tx++ )
        {
            for( ty = 0 ; ty < area.height ; ty++ )
            {
                cpt = 0 ;
                for( i = 0 ; i < len ; i++ )
                {
                    cpt += metaballs[i].metaball( tx , ty ) ;
                }
                if( cpt >= minThreshold && cpt <= maxThreshold)
                {
                    context.fillStyle = color ;
                    context.fillRect( tx , ty , 1 , 1 ) ;
                }
            }
        }

        window.requestAnimationFrame( render ) ;
    }

    var move = function( event )
    {
        spot.x = event.clientX ;
        spot.y = event.clientY ;
    }

    canvas.addEventListener( "mousemove", move ) ;

    render() ;
}


