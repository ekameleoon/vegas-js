"use strict" ;

/**
 * Indicates if the specific object is a String.
 */
export function isString( o )
{
    return (typeof(o) === 'string') || (o instanceof String )
}