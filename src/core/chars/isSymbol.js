"use strict" ;

import { symbols } from './symbols.js' ;

/**
 * Indicates if the character is an ASCII symbol.
 * @name isSymbol
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a symbol defines in the core.chars.symbols collection.
 */
export function isSymbol( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }

    return symbols.indexOf(c) > -1 ;
}
