/*jshint bitwise:false*/
"use strict" ;

/**
 * Extract the green part of an ARGB color (value between <code>0</code> and <code>255</code>).
 * @return The green part of an ARGB color (value between 0 and 255).
 * @name getGreen
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} color - The color value to evaluates.
 * @example
 * trace( getGreen( 0x0000FF00 ) ) ; // 255
 * trace( getGreen( 0x00FF00 ) ) ; // 0
 * trace( getGreen( 0x000000 ) ) ; // 0
 */
export var getGreen = ( color ) =>
{
    return (color >> 8) & 0xFF ;
}