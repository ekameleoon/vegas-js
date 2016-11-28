"use strict" ;

/**
 * Converts the first letter of each word in a string to uppercase.
 * @name capitalize
 * @memberof core.strings
 * @function
 * @instance
 * @param {string} source - The string reference to transform.
 * @return The capitalized string.
 * @example
 * trace( capitalize( "hello world" ) ) ; // Hello World
 */
export function capitalize( source )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }
    return source.replace( /\b[a-z]/g , ( match ) => match.toUpperCase() ) ;
}
