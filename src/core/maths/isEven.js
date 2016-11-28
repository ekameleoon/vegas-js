"use strict" ;

/**
 * Indicates if an integer that is "evenly divisible" by 2.
 * @name isEven
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} value - The value to check.
 * @return <code>true</code> if the passed-in value is even.
 * @example
 * trace( isEven(0) ) ; // true
 * trace( isEven(2) ) ; // true
 * trace( isEven(3) ) ; // false
 */
export var isEven = ( value ) => value%2 === 0 ;