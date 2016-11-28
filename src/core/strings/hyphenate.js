"use strict" ;

/**
 * Converts a camelcased string to a hyphenated string.
 * @name hyphenate
 * @memberof core.strings
 * @function
 * @instance
 * @param {string} source - The string reference to hyphenate.
 * @return The hyphenated string.
 * @example
 * trace( hyphenate( "helloWorld" ) ) ; //"hello-world"
 */
export function hyphenate( source )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }
    return source.replace
    (
        /[A-Z]/g, ( match ) => '-' + match.charAt(0).toLowerCase()
    );
}