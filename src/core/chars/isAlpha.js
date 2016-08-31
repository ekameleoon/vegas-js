"use strict" ;

/**
 * Indicates if the specified character is an alpha (A-Z or a-z) character.
 */
export function isAlpha( c /*String*/ ) /*Boolean*/
{
    return (("A" <= c) && (c <= "Z")) || (("a" <= c) && (c <= "z")) ;
}