"use strict" ;

/**
 * Anti-hyperbolic tangent.
 * @name atanH
 * @memberof core.maths
 * @function
 * @param {number} x - A real number
 * @return the Anti-hyperbolic tangent of the passed angle.
 */
export function atanH( x )
{
    return Math.log( ( 1 + x ) / ( 1 - x ) ) / 2 ;
}
