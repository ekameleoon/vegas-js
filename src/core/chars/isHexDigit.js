"use strict" ;

/**
 * Indicates if the specified character is a hexadecimal digit.
 */
export function isHexDigit( c /*String*/ ) /*Boolean*/
{
    return ( ("0" <= c) && (c <= "9") ) || (("A" <= c) && (c <= "F")) || (("a" <= c) && (c <= "f")) ;
}
