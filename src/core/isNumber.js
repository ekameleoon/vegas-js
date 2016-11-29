"use strict" ;

/**
 * Indicates if the specific object is a Number.
 * @name isNumber
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return {boolean} <code>true</code> if the object is a Number.
 * @example
 * trace( isNumber(0) ) ; // true
 * trace( isNumber(0.5) ) ; // true
 * trace( isNumber(true) ) ; // true
 * trace( isNumber(null) ) ; // false
 * trace( isNumber(NaN) ) ; // true
 */
export function isNumber( object )
{
    return (typeof(object) === 'number') || (object instanceof Number )
}