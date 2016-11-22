"use strict" ;

/**
 * Indicates if the specified character is a digit.
 * @name isDigit
 * @memberof core.chars
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} True if the specified character is a digit.
 */
export function isDigit( c /*String*/ , index /*uint*/ = 0 ) /*Boolean*/
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return ("0" <= c) && (c <= "9") ;
}
