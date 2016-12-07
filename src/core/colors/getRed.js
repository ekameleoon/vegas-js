/*jshint bitwise:false*/
"use strict" ;

/**
 * Extract the red part of an ARGB color (value between <code>0</code> and <code>255</code>).
 * @return The red part of an ARGB color (value between 0 and 255).
 * @name getRed
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} color - The color value to evaluates.
 * @example
 * trace( getRed( 0x00FF0000 ) ) ; // 255
 * trace( getRed( 0xFF0000 ) ) ; // 0
 * trace( getRed( 0x000000 ) ) ; // 0
 */
export var getRed = ( color ) =>
{
    return (color >> 16) & 0xFF ;
}