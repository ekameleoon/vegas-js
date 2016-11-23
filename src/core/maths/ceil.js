"use strict" ;

/**
 * Rounds and returns the ceiling of the specified number or expression.
 * The ceiling of a number is the closest integer that is greater than or equal to the number.
 * @name ceil
 * @memberof core.maths
 * @function
 * @example
 * trace(ceil(4.572525153, 2)) ; 4.58
 * trace(ceil(4.572525153, -1)) ; // 5
 * @param {number} n - The number to round.
 * @param {number} [floatCount=0] the count of number after the point.
 * @return the ceil value of a number by a count of floating points.
 */
export function ceil( n , floatCount = 0 )
{
    if (isNaN( n ))
    {
        return NaN ;
    }
    var r = 1 ;
    var i = - 1 ;
    while (++ i < floatCount)
    {
        r *= 10 ;
    }
    return Math.ceil( n * r ) / r  ;
}
