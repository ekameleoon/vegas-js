/*jshint bitwise:false*/
"use strict" ;

/**
 * Calculates the distance between two color number values.
 * @name distance
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} color1 - The first color value.
 * @param {number} color2 - The second color value.
 * @example
 * trace( distance( 0xFFFFFF , 0x000000 ) ) ; // 195075
 * trace( distance( 0xFFFFFF , 0xFFEEFF ) ) ; // 289
 * trace( distance( 0xFF0000 , 0xFF0000 ) ) ; // 0
 * trace( distance( 0xFFFFFF , 0xFFFFFF ) ) ; // 0
 */
export var distance = ( color1 , color2 ) =>
{
    return Math.pow( (color1 >> 16 & 0xFF) - (color2 >> 16 & 0xFF) , 2 ) +
           Math.pow( (color1 >> 8 & 0xFF)  - (color2 >> 8 & 0xFF)  , 2 ) +
           Math.pow( (color1 & 0xFF)       - (color2 & 0xFF)       , 2 ) ;
}