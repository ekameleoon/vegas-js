"use strict" ;

/**
 * Returns the unicode string notation of the specified numeric value.
 * @name aop
 * @memberof core.numbers
 * @function
 * @param {number} num - The number to transform in a unicode string.
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