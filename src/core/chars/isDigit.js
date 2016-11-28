"use strict" ;

/**
 * Indicates if the specified character is a digit.
 * @name isDigit
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} True if the specified character is a digit.
 * @example
 * trace( isDigit( "Z" ) ) ; // false
 * trace( isDigit( "+" ) ) ; // false
 * trace( isDigit( "0" ) ) ; // true
 * trace( isDigit( "9" ) ) ; // true
 */
export function isDigit( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return ("0" <= c) && (c <= "9") ;
}
