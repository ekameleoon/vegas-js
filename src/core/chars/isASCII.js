"use strict" ;

/**
 * Indicates if the specified character is an ASCII character.
 */
export function isASCII( c /*String*/ ) /*Boolean*/
{
    return c.charCodeAt( 0 ) <= 255 ;
}
