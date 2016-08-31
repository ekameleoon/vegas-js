"use strict" ;

/**
 * Returns the unicode string notation of the specified numeric value.
 * @return the unicode string notation of the specified numeric value.
 */
export function toUnicodeNotation( num )
{
    var hex = num.toString( 16 ) ;
    while( hex.length < 4 )
    {
        hex = "0" + hex ;
    }
    return hex ;
}