"use strict" ;

/**
 * Indicates if the specific object is a Boolean.
 * @name isBoolean
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return {boolean} <code>true</code> if the object is a Boolean.
 * @example
 * trace( isBoolean(0) ) ; // false
 * trace( isBoolean(true) ) ; // true
 * trace( isBoolean(false) ) ; // true
 * trace( isBoolean(3>2) ) ; // true
 * trace( isBoolean(null) ) ; // false
 */
export function isBoolean( object )
{
    return (typeof(object) === 'boolean') || (object instanceof Boolean )
}