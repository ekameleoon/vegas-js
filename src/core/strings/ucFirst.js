"use strict" ;

/**
 * Capitalize the first letter of a string.
 * @name ucFirst
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to transform.
 * @return The capitalized first expression.
 * @example
 * trace( ucFirst("hello world")) ; // Hello world
 */
export function ucFirst( str )
{
    if( !(str instanceof String || typeof(str) === 'string' ) || str === "" )
    {
        return '' ;
    }
    return str.charAt(0).toUpperCase() + str.substring(1) ;
}