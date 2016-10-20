"use strict" ;

import { lineTerminators } from './lineTerminators.js' ;

/**
 * Indicates if the specified character is a line terminator.
 * <p>Note: line terminators</p>
 * <pre class="prettyprint">
 * "\n" - u000A - LF : Line Feed
 * "\r" - u000D - CR : Carriage Return
 * ???  - u2028 - LS : Line Separator
 * ???  - u2029 - PS : Paragraphe Separator
 * </pre>
 * @see ECMA-262 spec 7.3 (PDF p24/188)
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the passed-in string value is a line terminator defines in the core.chars.lineTerminators collection.
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
