/*jshint bitwise:false*/
"use strict" ;

/**
 * Evaluates a given color to a set of colors and defines if this color is unique.
 * @name isUnique
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} color The color to evaluate.
 * @param {Array} colors The vector of uint colors to compare the specific color value.
 * @param {number} [tolerance=0.01] - The tolerance of the algorythm.
 * @return True is the color is sufficiently unique.
 * @example
 * var colors = [ 0xFF0000 , 0x00FF00 , 0x0000FF , 0x000000 ] ;
 *
 * trace( isUnique( 0xFFFFFF , colors ) ) ; // true
 * trace( isUnique( 0xEEFFFF , colors ) ) ; // true
 *
 * trace( isUnique( 0xFF0000 , colors ) ) ; // false
 * trace( isUnique( 0xFE0000 , colors ) ) ; // false
 *
 * trace( isUnique( 0x00FF00 , colors ) ) ; // false
 * trace( isUnique( 0x0000FF , colors ) ) ; // false
 * trace( isUnique( 0x000000 , colors ) ) ; // false
 */
export var isUnique = ( color , colors , tolerance = 0.01 ) =>
{
    if( !(colors instanceof Array) || colors.length === 0 )
    {
        return true ;
    }

    tolerance = tolerance * ( 255 * 255 * 3 ) << 0 ;

    let cur ;
    let distance ;

    let len = colors.length ;
    for( let i = 0 ; i < len ; i++ )
    {
        cur = colors[i] ;
        distance = Math.pow( (color >> 16 & 0xFF) - (cur >> 16 & 0xFF) , 2 ) +
                   Math.pow( (color >> 8 & 0xFF)  - (cur >> 8 & 0xFF)  , 2 ) +
                   Math.pow( (color & 0xFF)       - (cur & 0xFF)       , 2 ) ;

        if( distance <= tolerance )
        {
            return false ;
        }
    }
    return true ;
}