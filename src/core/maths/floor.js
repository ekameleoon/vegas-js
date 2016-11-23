"use strict" ;

/**
 * Rounds and returns a number by a count of floating points.
 * @name floor
 * @memberof core.maths
 * @function
 * @param {number} n - The number to round.
 * @param {number} [floatCount=0] the count of number after the point.
 * @return the floor value of a number by a count of floating points.
 * @example
 * trace(floor(4.572525153, 2)) ; // 4.57
 * trace(floor(4.572525153, -1)) ; // 4
 */
export var floor = ( n , floatCount = 0 ) =>
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
    return Math.floor( n * r ) / r  ;
}
