"use strict" ;

import { whiteSpaces } from './whiteSpaces.js' ;

/**
 * Indicates if the character is white space.
 * @name isWhiteSpace
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a white space defines in the core.chars.whiteSpaces collection.
 * @example
 * trace( isWhiteSpace( '!' ) ) ;
 * trace( isWhiteSpace( ' ' ) ) ;
 * trace( isWhiteSpace( '\r' ) ) ;
 */
export function isWhiteSpace( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }

    return whiteSpaces.indexOf(c) > -1 ;
}
