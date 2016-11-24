"use strict" ;

/**
 * Checks if this string starts with the specified prefix.
 * @name startsWith
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to evaluates.
 * @param {string} value - The string expression to find in first in the source.
 * @return <code>true</code> if the value is find in first.
 * @example
 * trace( startsWith( "hello.txt" , "hello" ) ) ; // true
 */
export function startsWith( source , value )
{
    if
    (
        !(source instanceof String || typeof(source) === 'string' ) ||
        !(value instanceof String  || typeof(value)  === 'string' ) ||
        source.length < value.length
    )
    {
        return false ;
    }

    if( value === "" )
    {
        return true ;
    }

    if( source.charAt( 0 ) !== value.charAt( 0 ) )
    {
        return false;
    }

    return source.indexOf( value ) === 0 ;
}