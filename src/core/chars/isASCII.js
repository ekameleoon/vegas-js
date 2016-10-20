"use strict" ;

/**
 * Indicates if the specified character is an ASCII character.
 * @param c The expression to evaluate.
 * @param index The optional index to evaluate a specific character in the passed-in expression.
 * @return True if the specified character is a ASCII character.
 */
export function isASCII( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return c.charCodeAt( 0 ) <= 255 ;
}
