"use strict" ;

/**
 * Indicates if an value is a float number.
 * @name isFloat
 * @memberof core
 * @function
 * @instance
 * @param {number} value - The value to evaluates.
 * @return <code>true</code> if the passed-in value is a float.
 * @example
 * trace( isFloat(0) ) ; // false
 * trace( isFloat(0.5) ) ; // true
 * trace( isFloat(1) ) ; // false
 */
export var isFloat = ( value ) => (Number(value) === value) && (value % 1 !== 0);