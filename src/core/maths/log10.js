"use strict" ;

/**
 * Calculates the log10 of the specified value.
 * @name log10
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} value - The value to calculate.
 * @return The log10 of the specified value.
 * @example
 * trace( log10(10) ) ; // 1
 */
export function log10( value )
{
    return Math.log( value ) / Math.LN10;
}
