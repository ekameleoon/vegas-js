"use strict" ;

/**
 * Indicates if the specified character is a start identifier.
 * UnicodeLetter
 * $
 * _
 * or the \ unicode escape sequence.
 * @see ECMA-262 spec 7.6 (PDF p26/188)
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the specified character is an identifier start character.
 */
export function isIdentifierStart( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return (("A" <= c) && (c <= "Z")) || (("a" <= c) && (c <= "z")) || ( c === "_" ) || ( c  === "$" ) ;
}
