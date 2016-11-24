"use strict" ;

/**
 * Converts a hyphenated string to a camelcased string.
 * @name camelCase
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to camelcase.
 * @return The camelcased string.
 * @example
 * trace( camelCase("hello-world" ) ) ; // helloWorld
 */
export function camelCase( source )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }
    return source.replace( /-\D/g , ( match ) => match.charAt(1).toUpperCase() ) ;
}