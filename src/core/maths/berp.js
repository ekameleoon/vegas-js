"use strict" ;

import { clamp } from './clamp.js' ;

/**
 * Short for 'boing-like interpolation', this method will first overshoot, then waver back and forth around the end value before coming to a rest.
 * @name berp
 * @memberof core.maths
 * @function
 * @example
 * trace( berp( 0 , 100 , 0.5 ) ;
 * @param {number} amount - The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param {number} start - The begining value.
 * @param {number} end - The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */
export var berp = ( amount , start , end ) =>
{
    if ( start === end )
    {
        return start ;
    }
    amount = clamp( amount , 0 , 1 ) ;
    amount = ( Math.sin( amount * Math.PI * ( 0.2 + 2.5 * amount * amount * amount ) ) * Math.pow( 1 - amount , 2.2 ) + amount ) * ( 1 + ( 1.2 * ( 1 - amount ) ) ) ;
    return start + ( end - start ) * amount ;
}
