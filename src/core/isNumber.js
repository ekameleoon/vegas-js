"use strict" ;

/**
 * Indicates if the specific object is a Number.
 * @name isNumber
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return <code>true</code> if the object is a Number.
 */
export function isNumber( object )
{
    return (typeof(object) === 'number') || (object instanceof Number )
}