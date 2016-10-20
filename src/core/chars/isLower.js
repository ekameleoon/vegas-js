"use strict" ;

/**
 * Indicates if the character is lowercase.
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the specified character is lowercase.
 */
export function isLower( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return ( "a" <= c ) && ( c <= "z" ) ;
}
