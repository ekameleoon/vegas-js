"use strict" ;

/**
 * Determines whether the specified object exists as an element in an Array object.
 * @example
 * var ar = [2, 3, 4] ;
 * trace( core.arrays.contains( ar , 3 ) ) ; // true
 * trace( core.arrays.contains( ar , 5 ) ) ; // false
 * @param ar The search Array.
 * @param value The object to find in the array.
 * @return <code>true</code> if the specified object exists as an element in the array ; otherwise, <code>false</code>.
 * @memberof core.arrays
 * @name contains
 * @instance
 */
export var contains = ( array /*Array*/ , value ) => (array instanceof Array) ? (array.indexOf(value) > -1) : false ;