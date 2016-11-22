"use strict" ;

/**
 * Indicates if the specified character is an ASCII character.
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} True if the specified character is a ASCII character.
 * @memberof core.chars
 * @name isASCII
 * @function
 */
export function isASCII( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return c.charCodeAt( 0 ) <= 255 ;
}
