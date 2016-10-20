"use strict" ;

/**
 * Indicates if the specified character is an alpha (A-Z or a-z) or a digit character.
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the specified character is an alpha or digit character.
 */
export function isAlphaOrDigit( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return (("A" <= c) && (c <= "Z")) || (("a" <= c) && (c <= "z")) || (("0" <= c) && (c <= "9")) ;
}