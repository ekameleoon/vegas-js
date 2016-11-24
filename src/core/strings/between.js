"use strict" ;

/**
 * Converts a hyphenated string to a camelcased string.
 * @name between
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to transform.
 * @return The new extracted string.
 * @example
 * trace( between("<b>hello</b>" , "<b>" , "</b>" ) ) ; // hello
 * trace( between("hello {world}" , "{" , "}" ) ) ; // world
 */
export function between( source , left , right )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }

    if( !(left instanceof String || typeof(left) === 'string' ) || left === "" )
    {
        return source ;
    }

    var start = source.indexOf( left ) ;
    var end   = source.indexOf( right , start + left.length );

    if( end < 0 || !(right instanceof String || typeof(right) === 'string' ) || right === "" )
    {
        return source.substring( start+left.length ) ;
    }

    return source.slice( start + left.length, end) ;
}