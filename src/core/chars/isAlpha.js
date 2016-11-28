"use strict" ;

/**
 * @name isAlpha
 * @function
 * @instance
 * @memberof core.chars
 * @description Indicates if the specified character is an alpha (A-Z or a-z) character.
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} <code>true</code> if the specified character is an alpha character.
 */
export function isAlpha( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return (("A" <= c) && (c <= "Z")) || (("a" <= c) && (c <= "z")) ;
}