"use strict" ;

/**
 * Evaluates whether the two values are equal to each other, within a certain tolerance to adjust for floating pount errors.
 * @name nearlyEquals
 * @memberof core.maths
 * @function
 * @param {number} value1 - A number to evaluate.
 * @param {number} value2 - A number to evaluate.
 * @param {number} [tolerance=0.000001] - An optional tolerance range. If specified, should be greater than 0.
 * @return <code>true</code> if value1 and value2 are nearly equal.
 */
export var nearlyEquals = ( value1 , value2 , tolerance = 0.000001 ) =>
{
    if( isNaN(tolerance ) )
    {
        tolerance = 0.000001 ;
    }
    else if ( tolerance < 0 )
    {
        tolerance = 0 ;
    }
    return Math.abs( value1 - value2 ) <= tolerance ;
}
