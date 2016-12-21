"use strict" ;

/**
 * Transform a float number into this integer representation.
 * @name toInt
 * @memberof core.numbers
 * @function
 * @instance
 * @param {number} num - The number to transform in an integer numeric value.
 * @return The integer representation of the specific value.
 * @example
 * trace( toInt(0) ) ; // 0
 * trace( toInt(10) ) ; // 10
 * trace( toInt(10.123) ) ; // 10
 * trace( toInt(-10.123) ) ; // -10
 */
export function toInt( num )
{
    return num - (num % 1) ;
}