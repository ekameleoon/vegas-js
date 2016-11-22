"use strict" ;

/**
 * Indicates if the specific object is a Boolean.
 * @name isBoolean
 * @memberof core
 * @function
 * @instance
 * @param {Object} object - The object to check.
 * @return <code>true</code> if the object is a Boolean.
 */
export function isBoolean( object )
{
    return (typeof(object) === 'boolean') || (object instanceof Boolean )
}