"use strict" ;

import { lineTerminators } from './lineTerminators.js' ;

/**
 * @description Indicates if the specified character is a line terminator :
 * * "\n" - u000A - LF : Line Feed
 * * "\r" - u000D - CR : Carriage Return
 * * ???  - u2028 - LS : Line Separator
 * * ???  - u2029 - PS : Paragraphe Separator
 * @name isLineTerminator
 * @memberof core.chars
 * @function
 * @instance
 * @see <a href="http://www.ecma-international.org/ecma-262/5.1/Ecma-262.pdf">ECMA-262 spec 7.3 (PDF)</a>
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a line terminator defines in the core.chars.lineTerminators collection.
 * @example
 * trace( isLineTerminator( "h" ) ) ; // false
 * trace( isLineTerminator( "\n" ) ) ; // true
 */
export function isLineTerminator( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }

    var l = lineTerminators.length ;
    while( --l > -1 )
    {
        if( c === lineTerminators[l] )
        {
            return true;
        }
    }

    return false ;
}
