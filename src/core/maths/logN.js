"use strict" ;

/**
 * Calculates the logN of the specified value.
 * @name log10
 * @memberof core.maths
 * @function
 * @param {number} value - The value to calculate.
 * @param {number} base - The base to calculate the log of the value.
 * @return The logN of the specified value.
 * @example
 * trace( logN(10,10) ) ; // 1
 */
export function logN( value , base )
{
    return Math.log(value) / Math.log(base) ;
}
