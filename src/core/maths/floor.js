"use strict" ;

/**
 * Rounds and returns a number by a count of floating points.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var n ;
 *
 * n = core.maths.floor(4.572525153, 2) ;
 * trace ("n : " + n) ; // n : 4.57
 *
 * n = core.maths.floor(4.572525153, -1) ;
 * trace ("n : " + n) ; // n : 4
 * </pre>
 * @param n the number to round.
 * @param floatCount the count of number after the point.
 * @return the floor value of a number by a count of floating points.
 */
export var floor = ( n , floatCount ) =>
{
    if (isNaN( n ))
    {
        return NaN ;
    }
    var r /*Number*/ = 1 ;
    var i /*Number*/ = - 1 ;
    while (++ i < floatCount)
    {
        r *= 10 ;
    }
    return Math.floor( n * r ) / r  ;
}
