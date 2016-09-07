"use strict" ;

/**
 * Indicates if the specific object is a Boolean.
 */
export function isBoolean( o )
{
    return (typeof(o) === 'boolean') || (o instanceof Boolean )
}