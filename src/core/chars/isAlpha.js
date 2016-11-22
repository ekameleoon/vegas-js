"use strict" ;

/**
 * @name isAlpha
 * @function
 * @memberof core.chars
 * Indicates if the specified character is an alpha (A-Z or a-z) character.
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} True if the specified character is an alpha character.
 */
export function isAlpha( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return (("A" <= c) && (c <= "Z")) || (("a" <= c) && (c <= "z")) ;
}