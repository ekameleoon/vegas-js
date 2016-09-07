"use strict" ;

/**
 * Indicates if the specific object is a Number.
 */
export function isNumber( o )
{
    return (typeof(o) === 'number') || (o instanceof Number )
}