/*jshint bitwise:false*/
"use strict" ;

import { littleEndian } from '../maths/littleEndian.js' ;

var max = 0xFF ;

/**
 * Calculates the ARGB hexadecimal color value with the fours respected passed-in a,r,g,b components (values between <code>0</code> and <code>255</code>).
 * @name fromRGBA
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} r - The red integer component between <code>0</code> and <code>255</code> (<code>0xFF</code>).
 * @param {number} g - The green integer component between <code>0</code> and <code>255</code> (<code>0xFF</code>).
 * @param {number} b - The blue integer component between <code>0</code> and <code>255</code> (<code>0xFF</code>).
 * @param {number} a - The alpha (transparency) integer component between <code>0</code> and <code>1</code>.
 * @example
 * trace( fromRGBA(170,170,170,0.6) === 0x99AAAAAA ) ; // true
 */
export var fromRGBA = ( r , g , b , a ) =>
{
    r = Math.min( r , max ) ;
    g = Math.min( g , max ) ;
    b = Math.min( b , max ) ;

    a = isNaN(a) ? 0 : a ;
    a = 0xFF * Math.max( Math.min( a, 1 ) , 0 ) ;

    return littleEndian ? ( (a << 24) | (b << 16) | (g <<  8) | r ) >>> 0
                        : ( (r << 24) | (g << 16) | (b <<  8) | a ) >>> 0 ;
}