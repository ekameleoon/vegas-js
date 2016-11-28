"use strict" ;

/**
 * Bounds a numeric value between 2 numbers.
 * @name clamp
 * @memberof core.maths
 * @function
 * @instance
 * @example
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
 * @param {number} value - The value to clamp.
 * @param {number} min - The min value of the range.
 * @param {number} max - The max value of the range.
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
