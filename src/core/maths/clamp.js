"use strict" ;

/**
 * Bounds a numeric value between 2 numbers.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var n ;
 *
 * n = core.maths.clamp(4, 5, 10) ;
 * trace ("n : " + n) ; // 5
 *
 * n = core.maths.clamp(12, 5, 10) ;
 * trace ("n : " + n) ; // 10
 *
 * n = core.maths.clamp(6, 5, 10) ;
 * trace ("n : " + n) ; // 5
 *
 * n = core.maths.clamp(NaN, 5, 10) ;
 * trace ("n : " + n) ; // NaN
 * </pre>
 * @param value the value to clamp.
 * @param min the min value of the range.
 * @param max the max value of the range.
 * @return a bound numeric value between 2 numbers.
 */
export var clamp = ( value , min , max ) =>
{
    if ( isNaN( value ) )
    {
        return NaN ;
    }
    if ( isNaN( min ) )
    {
        min = value ;
    }
    if ( isNaN( max ) )
    {
        max = value ;
    }
    return Math.max( Math.min( value, max ), min ) ;
}
