"use strict" ;

/**
 * Indicates if the specific object is a String.
 * @name isString
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return <code>true</code> if the object is a String.
 */
export function isString( object )
{
    return (typeof(object) === 'string') || (object instanceof String )
}