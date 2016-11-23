"use strict" ;

import { clamp } from './clamp.js' ;

/**
 * Works like {@link core.maths.Lerp}, but has ease-in and ease-out of the values.
 * @name smooth
 * @memberof core.maths
 * @function
 * @param {number} start the begining value.
 * @param {number} end The ending value.
 * @param {number} amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( smooth( 0 , 100 , 0.5 ) ; // 50
 */
export var smooth = ( start , end , amount ) =>
{
    if ( start === end )
    {
        return start ;
    }

    amount = clamp(amount, start, end);

    let v1 = (amount - start) / (end - start);
    let v2 = (amount - start) / (end - start);

    return -2 * v1 * v1 * v1 + 3 * v2 * v2;
}
