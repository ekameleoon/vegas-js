"use strict" ;

/**
 * Indicates if an integer that is not "evenly divisible" by 2.
 * @name isOdd
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} value - The value to check.
 * @return <code>true</code> if the passed-in value is odd.
 * @example
 * trace( isOdd(0) ) ; // false
 * trace( isOdd(2) ) ; // false
 * trace( isOdd(3) ) ; // true
 * trace( isOdd(5) ) ; // true
 */
export var isOdd = ( value ) => value%2 !== 0 ;