/*jslint noempty: false */
/*jslint unused: false */
"use strict" ;

import { whiteSpaces } from './whiteSpaces.js' ;

/**
 * Removes all occurrences of a set of characters specified in an array from the end of this instance.
 * @name trimEnd
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to trim.
 * @param {array} [chars=null] - The optional Array of characters to trim. If this argument is null the {@link core.strings.whiteSpaces} array is used.
 * @return The new trimed string.
 * @example
 * trace( trimEnd("---hello world---" , ["-"] ) ) ; // ---hello world
 */
export function trimEnd( source , chars = null )
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

    for( i = source.length - 1; (i >= 0) && (chars.indexOf( source.charAt( i ) ) > - 1) ; i-- ){}

    return source.substring( 0, i + 1 );
}