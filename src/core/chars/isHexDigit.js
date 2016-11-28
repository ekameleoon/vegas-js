"use strict" ;

/**
 * Indicates if the specified character is a hexadecimal digit.
 * @name isHexDigit
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <true> if the specified character is an hexadecimal digit.
 * @example
 * trace( isHexDigit( "Z" ) ) ; // false
 * trace( isHexDigit( "+" ) ) ; // false
 * trace( isHexDigit( "0" ) ) ; // true
 * trace( isHexDigit( "1" ) ) ; // true
 * trace( isHexDigit( "2" ) ) ; // true
 * trace( isHexDigit( "9" ) ) ; // true
 * trace( isHexDigit( "A" ) ) ; // true
 * trace( isHexDigit( "F" ) ) ; // true
 */
export function isHexDigit( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return ( ("0" <= c) && (c <= "9") ) || (("A" <= c) && (c <= "F")) || (("a" <= c) && (c <= "f")) ;
}
