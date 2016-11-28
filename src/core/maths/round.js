"use strict" ;

/**
 * Rounds and returns a number by a count of floating points.
 * @name round
 * @memberof core.maths
 * @function
 * @instance
 * @example
 * var n ;
 * n = core.maths.round(4.572525153, 2) ;
 * trace ("n : " + n) ; // 4.57
 *
 * n = core.maths.round(4.572525153, -1) ;
 * trace ("n : " + n) ; // 5
 * @param {number} n - The number to round.
 * @param {number} [floatCount=0] - The count of number after the point.
 * @return The round of a number by a count of floating points.
 */
export var round = ( n , floatCount = 0 ) =>
{
    if ( isNaN(n) )
    {
        return NaN ;
    }
    let r  = 1 ;
    let i  = - 1 ;
    while (++ i < floatCount)
    {
        r *= 10 ;
    }
    return Math.round( n * r ) / r  ;
}
