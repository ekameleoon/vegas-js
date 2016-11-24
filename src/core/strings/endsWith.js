"use strict" ;

/**
 * Determines wether the end of a string matches the specified value.
 * @name endsWith
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to check.
 * @param {string} value - The value to find in end in the source.
 * @return <code>true</code> if the value is find in first.
 * @example <caption>Basic usage</caption>
 * trace( endsWith( "hello world", "world" ) ); //true
 * trace( endsWith( "hello world", "hello" ) ); //false
 */
export function endsWith( source , value )
{
    if( source !== null && value === "" )
    {
        return true ;
    }
    if( (source === null) || (value === null) || (source === "") || (source.length < value.length) )
    {
        return false;
    }
    return source.lastIndexOf(value) === ( source.length - value.length ) ;
}