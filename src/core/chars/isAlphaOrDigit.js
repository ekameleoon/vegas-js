"use strict" ;

/**
 * Indicates if the specified character is an alpha (A-Z or a-z) or a digit character.
 * @name isAlphaOrDigit
 * @memberof core.chars
 * @instance
 * @function
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the specified character is an alpha or digit character.
 * @example
 * trace( isAlphaOrDigit( "Z" ) ) ; // true
 * trace( isAlphaOrDigit( "a" ) ) ; // true
 * trace( isAlphaOrDigit( "0" ) ) ; // true
 * trace( isAlphaOrDigit( "9" ) ) ; // true
 * trace( isAlphaOrDigit( "+" ) ) ; // false
 */
export function isAlphaOrDigit( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return (("A" <= c) && (c <= "Z")) || (("a" <= c) && (c <= "z")) || (("0" <= c) && (c <= "9")) ;
}