"use strict" ;

/**
 * Evaluates whether the two values are equal to each other, within a certain tolerance to adjust for floating pount errors.
 * @param value1 a number to evaluate.
 * @param value2 a number to evaluate.
 * @param tolerance An optional tolerance range. Defaults to 0.000001. If specified, should be greater than 0.
 * @return True if value1 and value2 are nearly equal.
 */
export var nearlyEquals = ( value1 , value2 , tolerance ) =>
{
    if( isNaN(tolerance ) )
    {
        tolerance = 0.000001 ;
    }
    return Math.abs( value1 - value2 ) <= tolerance ;
}
