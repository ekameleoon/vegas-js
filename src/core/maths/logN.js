"use strict" ;

/**
 * Calculates the logN of the specified value.
 * @param value The value to calculate.
 * @param base The base to calculate the log of the value.
 * @return The logN of the specified value.
 */
export function logN( value /*Number*/ , base /*int*/ ) /*Number*/
{
    return Math.log(value) / Math.log(base) ;
}
