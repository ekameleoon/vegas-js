/*jshint bitwise:false*/
"use strict" ;

/**
 * Extract the blue part of an ARGB color (value between <code>0</code> and <code>255</code>).
 * @return The blue part of an ARGB color (value between 0 and 255).
 * @name getBlue
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} color - The color value to evaluates.
 * @example
 * trace( getBlue( 0x0000FF ) ) ; // 255
 * trace( getBlue( 0xFFFF00 ) ) ; // 0
 * trace( getBlue( 0x000000 ) ) ; // 0
 */
export var getBlue = ( color ) =>
{
    return color & 0xFF ;
}