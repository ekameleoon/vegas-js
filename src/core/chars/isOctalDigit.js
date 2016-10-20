"use strict" ;

/**
 * Indicates if the specified character is an octal digit.
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the specified character is an octal digit.
 */
export function isOctalDigit( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return ("0" <= c) && (c <= "7") ;
}
