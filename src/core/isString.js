"use strict" ;

/**
 * Indicates if the specific object is a String.
 * @name isString
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return <code>true</code> if the object is a String.
 * @example
 * trace( isString(0) ) ; // false
 * trace( isString(true) ) ; // false
 * trace( isString(null) ) ; // false
 * trace( isString('hello') ) ; // true
 * trace( isString(new String('hello')) ) ; // true
 */
export function isString( object )
{
    return (typeof(object) === 'string') || (object instanceof String )
}