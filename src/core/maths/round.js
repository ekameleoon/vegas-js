"use strict" ;

/**
 * Rounds and returns a number by a count of floating points.
 * <p><b>Example :</b></p>
 * <pre>
 * var n ;
 * n = core.maths.round(4.572525153, 2) ;
 * trace ("n : " + n) ; // 4.57
 *
 * n = core.maths.round(4.572525153, -1) ;
 * trace ("n : " + n) ; // 5
 * </pre>
 * @param n the number to round.
 * @param floatCount the count of number after the point.
 * @return the round of a number by a count of floating points.
 */
export var round = ( n , floatCount ) =>
{
    if (isNaN( n ))
    {
        return NaN ;
    }
    var r  = 1 ;
    var i  = - 1 ;
    while (++ i < floatCount)
    {
        r *= 10 ;
    }
    return Math.round( n * r ) / r  ;
}
