/*jshint bitwise:false*/
"use strict" ;

/**
 * Extract the alpha part of an ARGB color (value between <code>0</code> and <code>255</code>).
 * @return The alpha part of an ARGB color (value between 0 and 255).
 * @name getAlpha
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} color - The color value to evaluates.
 * @example
 * trace( getAlpha( 0xFFFFFFFF ) ) ; // 255
 * trace( getAlpha( 0xFF000000 ) ) ; // 255
 * trace( getAlpha( 0x00FFFFFF ) ) ; // 0
 */
export var getAlpha = ( color ) =>
{
    return (color >> 24) & 0xFF ;
}