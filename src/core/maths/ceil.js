"use strict" ;

/**
 * Rounds and returns the ceiling of the specified number or expression.
 * The ceiling of a number is the closest integer that is greater than or equal to the number.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var n ;
 *
 * n = core.maths.ceil(4.572525153, 2) ;
 * trace ("n : " + n) ; // n : 4.58
 *
 * n = core.maths.ceil(4.572525153, -1) ;
 * trace ("n : " + n) ; // n : 5
 * </pre>
 * @param n the number to round.
 * @param floatCount the count of number after the point.
 * @return the ceil value of a number by a count of floating points.
 */
export function ceil( n /*Number*/ , floatCount /*Number*/ ) /*Number*/
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
    return Math.ceil( n * r ) / r  ;
}
