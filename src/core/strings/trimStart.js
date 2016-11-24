/*jslint noempty: false */
"use strict" ;

import { whiteSpaces } from './whiteSpaces.js' ;

/**
 * Removes all occurrences of a set of characters specified in an array from the beginning of this instance.
 * @name trimStart
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to trim.
 * @param {array} [chars=null] - The optional Array of characters to trim. If this argument is null the {@link core.strings.whiteSpaces} array is used.
 * @return The new trimed string.
 * @example
 * trace( trimStart( "---hello world---" , ["-"] ) ); // hello world---
 */
export function trimStart( source , chars = null )
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
    var l = source.length ;

    for( i = 0; (i < l) && (chars.indexOf( source.charAt( i ) ) > - 1) ; i++ ){}

    return source.substring( i );
}