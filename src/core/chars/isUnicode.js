"use strict" ;

/**
 * Indicates if the specified character is a unicode character.
 */
export function isUnicode( c /*String*/ ) /*Boolean*/
{
    return c.charCodeAt( 0 ) > 255 ;
}
