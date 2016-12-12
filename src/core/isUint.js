"use strict" ;

/**
 * Indicates if an value is an upper integer.
 * @name isUint
 * @memberof core
 * @function
 * @instance
 * @param {number} value - The value to evaluates.
 * @return <code>true</code> if the passed-in value is an upper integer.
 * @example
 * trace( isUint(-1) ) ; // false
 * trace( isUint(0) ) ; // true
 * trace( isUint(0.5) ) ; // false
 * trace( isUint(1) ) ; // true
 */
export var isUint = ( value ) => Number(value) === value && (value%1 === 0) && (value >= 0);