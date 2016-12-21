"use strict" ;

/**
 * Transform a float number into this upper integer representation.
 * @name toUint
 * @memberof core.numbers
 * @function
 * @instance
 * @param {number} num - The number to transform in an upper integer numeric value.
 * @return The upper integer representation of the specific numeric value.
 * @example
 * trace( toUint(0) ) ; // 0
 * trace( toUint(10) ) ; // 10
 * trace( toUint(10.123) ) ; // 10
 * trace( toUint(-10.123) ) ; // 10
 */
export function toUint( num )
{
    num -= (num % 1) ;
    return num < 0 ? -num : num ;
}