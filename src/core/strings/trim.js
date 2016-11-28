/*jslint noempty: false */
"use strict" ;

import { whiteSpaces } from '../chars/whiteSpaces.js' ;

/**
 * Removes all occurrences of a set of specified characters (or strings) from the beginning and end of this instance.
 * @name trim
 * @memberof core.strings
 * @function
 * @instance
 * @param {string} source - The string reference to trim.
 * @param {array} [chars=null] - The optional Array of characters to trim. If this argument is null the {@link core.chars.whiteSpaces} array is used.
 * @return The new trimed string.
 * @example
 * trace( trim("\r\t   hello world   \t ") ); // hello world
 * trace( trim("-_hello world_-",["-","_"]) ) ; // hello world
 */
export function trim( source , chars = null )
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }

    if( !chars || !(chars instanceof Array) )
    {
        chars = whiteSpaces ;
    }

    var i ;
    var l ;

    // ---- start

    l = source.length ;

    for( i = 0 ; (i < l) && (chars.indexOf( source.charAt( i ) ) > - 1) ; i++ ){}
    source = source.substring( i );

    // ---- end

    l = source.length ;
    for( i = source.length - 1; (i >= 0) && (chars.indexOf( source.charAt( i ) ) > - 1) ; i-- ){}
    source = source.substring( 0, i + 1 ) ;

    // ----

    return source ;
}