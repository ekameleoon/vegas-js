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
    var graphics = vegas.graphics ; // jshint ignore:line

    var fade  = core.colors.fade ;
    var toHex = core.colors.toHex ;
    var Point = graphics.geom.Point ;

    // ----- initialize

    var canvas  = document.getElementById('canvas') ;
    var context = canvas.getContext('2d');

    canvas.width  = 800;
    canvas.height = 640;

    var width  = canvas.width ;
    var height = canvas.height ;

    var size = 40 ;

    var ratio ;
    var rgb ;
    var color ;

    var clear = function()
    {
        context.clearRect(0, 0, width, height);
        context.fillStyle = '#333333' ;
        context.fillRect(0, 0, width, height );
    }

    var render = function( position , start , end , rows )
    {
        for( var i = 0 ; i < rows ; i++ )
        {
            ratio = i/(rows-1);
            color = fade( start , end, ratio ) ;

            rgb = toHex( color ) ;

            context.fillStyle = rgb ;
            context.fillRect( position.x + (i * size) , position.y , size , size );

            trace( ratio + " => value:" + color + " color:" + rgb );
        }
    }

    clear() ;
    render( new Point(25, 25) , 0x00FF00 , 0xFF0000 , 12 ) ;
    render( new Point(25, 75) , 0xFFFFFF , 0x000000 , 12 ) ;
    render( new Point(25,130) , 0x125D7F , 0xFFED5D , 12 ) ;
 }
