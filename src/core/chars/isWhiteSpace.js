"use strict" ;

import { whiteSpaces } from './whiteSpaces.js' ;

/**
 * Indicates if the character is white space.
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the passed-in string value is a white space defines in the core.chars.whiteSpaces collection.
 * @example
 * <pre>
 * var isWhiteSpace = core.chars.isWhiteSpace ;
 *
 * trace( isWhiteSpace( '!' ) ) ;
 * trace( isWhiteSpace( ' ' ) ) ;
 * trace( isWhiteSpace( '\r' ) ) ;
 * </pre>
 */
export function isWhiteSpace( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }

    var l = whiteSpaces.length ;
    while( --l > -1 )
    {
        if( c === whiteSpaces[l] )
        {
            return true;
        }
    }

    return false ;
}
