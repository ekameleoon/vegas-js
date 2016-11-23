"use strict" ;

/**
 * Returns the unicode string notation of the specified numeric value.
 * @name toUnicodeNotation
 * @memberof core.numbers
 * @function
 * @param {number} num - The number to transform in a unicode string.
 * @return The unicode string notation of the specified numeric value.
 * @example
 * trace( toUnicodeNotation(  0) ) ; // "0000"
 * trace( toUnicodeNotation( 10) ) ; // "000a"
 * trace( toUnicodeNotation( 15) ) ; // "000f"
 * trace( toUnicodeNotation( 16) ) ; // "0010"
 * trace( toUnicodeNotation(255) ) ; // "00ff"
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