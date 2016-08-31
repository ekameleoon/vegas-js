"use strict" ;

/**
 * Indicates if the specified character is an octal digit.
 */
export function isOctalDigit( c /*String*/ ) /*Boolean*/
{
    return ("0" <= c) && (c <= "7") ;
}
