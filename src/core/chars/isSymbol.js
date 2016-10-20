"use strict" ;

import { symbols } from './symbols.js' ;

/**
 * Indicates if the character is a ASCII symbol.
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the passed-in string value is a symbol defines in the core.chars.symbols collection.
 */
export function isSymbol( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }

    var l = symbols.length ;
    while( --l > -1 )
    {
        if( c === symbols[l] )
        {
            return true;
        }
    }

    return false ;
}
