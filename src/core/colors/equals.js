/*jshint bitwise:false*/
"use strict" ;

/**
 * Evaluates if two colors are similar with a specific tolerance ratio between 0 and 1.
 * @name equals
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} color1 - The first color value.
 * @param {number} color2 - The second color value.
 * @param {number} [tolerance=0.01] - The tolerance ratio.
 * @return <code>true</code> if the two colors are similar.
 * @example
 * trace( equals( 0xFFFFFF , 0x000000 ) ) ; // false
 * trace( equals( 0xFF0000 , 0xFF0000 ) ) ; // true
 * trace( equals( 0xFFFFFF , 0xFFFFFF ) ) ; // true
 *
 * trace( equals( 0xFFFFFF , 0xFFEEFF ) ) ; // true
 * trace( equals( 0xFFFFFF , 0xFFEEFF , 0 ) ) ; // false
 * trace( equals( 0xFFFFFF , 0xFFEEFF , 1 ) ) ; // true
 */
export var equals = ( color1 , color2 , tolerance = 0.01 ) =>
{
    let dist = Math.pow( (color1 >> 16 & 0xFF) - (color2 >> 16 & 0xFF) , 2 ) +
               Math.pow( (color1 >> 8 & 0xFF)  - (color2 >> 8 & 0xFF)  , 2 ) +
               Math.pow( (color1 & 0xFF)       - (color2 & 0xFF)       , 2 ) ;
    return dist <= ( tolerance * ( 255 * 255 * 3 ) << 0 ) ;
}