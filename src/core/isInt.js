"use strict" ;

/**
 * Indicates if an value is an integer.
 * @name isInt
 * @memberof core
 * @function
 * @param {number} value - The value to evaluates.
 * @return <code>true</code> if the passed-in value is an integer.
 * @example
 * trace( isInt(-1) ) ; // true
 * trace( isInt(0) ) ; // true
 * trace( isInt(0.5) ) ; // false
 * trace( isInt(1) ) ; // true
 */
export var isInt = ( value ) => Number(value) === value && (value%1 === 0) ;