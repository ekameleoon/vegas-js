/*jshint bitwise:false*/
"use strict" ;

/**
 * Creates a new color with the fading between two rgb numeric colors and a specific ratio.
 * @name fade
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} from - The first color to interpolate.
 * @param {number} to - The second color to interpolate.
 * @param ratio The value between 0 and 1 to calculate the fading level.
 * @example <caption>Javascript example</caption>
 * "use strict" ;
 * window.onload = function()
 * {
 *     if( !vegas )
 *     {
 *         throw new Error("The VEGAS library is not found.") ;
 *     }
 *
 *     // ----- imports
 *
 *     var global   = vegas.global ; // jshint ignore:line
 *     var trace    = vegas.trace  ; // jshint ignore:line
 *     var core     = vegas.core   ; // jshint ignore:line
 *     var system   = vegas.system ; // jshint ignore:line
 *     var graphics = vegas.graphics ; // jshint ignore:line
 *
 *     var fade  = core.colors.fade ;
 *     var toHex = core.colors.toHex ;
 *     var Point = graphics.geom.Point ;
 *
 *     // ----- initialize
 *
 *     var canvas  = document.getElementById('canvas') ;
 *     var context = canvas.getContext('2d');
 *
 *     canvas.width  = 800;
 *     canvas.height = 640;
 *
 *     var width  = canvas.width ;
 *     var height = canvas.height ;
 *
 *     var size = 40 ;
 *
 *     var ratio ;
 *     var rgb ;
 *     var color ;
 *
 *     var clear = function()
 *     {
 *         context.clearRect(0, 0, width, height);
 *         context.fillStyle = '#333333' ;
 *         context.fillRect(0, 0, width, height );
 *     }
 *
 *     var render = function( position , start , end , rows )
 *     {
 *         for( var i = 0 ; i < rows ; i++ )
 *         {
 *             ratio = i/(rows-1);
 *             color = fade( start , end, ratio ) ;
 *
 *             rgb = toHex( color ) ;
 *
 *             context.fillStyle = rgb ;
 *             context.fillRect( position.x + (i * size) , position.y , size , size );
 *
 *             trace( ratio + " => value:" + color + " color:" + rgb );
 *         }
 *     }
 *
 *     clear() ;
 *     render( new Point(25, 25) , 0x00FF00 , 0xFF0000 , 12 ) ;
 *     render( new Point(25, 75) , 0xFFFFFF , 0x000000 , 12 ) ;
 *     render( new Point(25,130) , 0x125D7F , 0xFFED5D , 12 ) ;
 *  }
 * @example <caption>HTML page</caption>
 * <!doctype html>
 * <html>
 * <head>
 *     <meta charset="UTF-8">
 *     <title>Test core.colors.fade()</title>
 *     <style>
 *     body
 *     {
 *         margin: 0px;
 *         padding: 0px;
 *     }
 *     </style>
 * </head>
 * <body>
 *     <canvas id="canvas" width="100%" height="100%"></canvas>
 *     <script src="./js/vegas.js"></script>
 *     <script src="./js/fade.js"></script>
 * </body>
 * </html>
 */
export var fade = ( from = 0 , to = 0xFFFFFF , ratio = 0 ) =>
{
    if( ratio <= 0 )
    {
        return from ;
    }
    else if( ratio >= 1 )
    {
        return to ;
    }

    let r = from >> 16 ;
    let g = from >> 8 & 0xFF ;
    let b = from & 0xFF ;

    r += ( ( to >> 16       ) -r ) * ratio ;
    g += ( ( to >> 8 & 0xFF ) -g ) * ratio ;
    b += ( ( to      & 0xFF ) -b ) * ratio ;

    return r<<16 | g<<8 | b ;
}