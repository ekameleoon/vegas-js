"use strict" ;

/**
 * Determines whether the specified object exists as an element in an Array object.
 * @name contains
 * @memberof core.arrays
 * @function contains
 * @instance
 * @param {Array} ar - The search Array.
 * @param {*} value - The object to find in the array.
 * @return <code>true</code> if the specified object exists as an element in the array ; otherwise, <code>false</code>.
 * @example
 * var ar = [2, 3, 4] ;
 * trace( contains( ar , 3 ) ) ; // true
 * trace( contains( ar , 5 ) ) ; // false
 */
export var contains = ( array /*Array*/ , value ) =>
{
    return (array instanceof Array) ? (array.indexOf(value) > -1) : false ;
}