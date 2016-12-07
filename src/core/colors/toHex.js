/*jshint bitwise:false */
"use strict" ;

/**
 * Converts the specified uint value in a hexadecimal String representation.
 * @name toHex
 * @memberof core.colors
 * @function
 * @instance
 * @param {number} value - The value to format in an hexadecimal string expression.
 * @param {string} [prefix=#] - The string prefix of the final expression (default #).
 * @param {boolean} [upper=true] - Indicates if the string result is uppercase.
 * @example
 * trace( toHex( 0xFF0000 ) ) ; // #FF0000
 * trace( toHex( 0xFF0000 , '#' , false ) ) ; // #ff0000
 * trace( toHex( 0xFF0000 , '0x' ) ; // 0xFF0000
 * trace( toHex( 0xFF0000 , '' ) ) ; // FF0000
 * trace( toHex( 0xFF0000 , '' , false ) ) ; // ff0000
 */
export var toHex = ( value , prefix = '#' , upper = true ) =>
{
    if( !((Number(value) === value) && (value%1 === 0) && (value >= 0)) )
    {
        throw new TypeError( 'toHex failed, the value parameter must be an upper integer.' ) ;
    }

    prefix = (typeof(prefix) === 'string' || prefix instanceof String ) ? prefix : '#' ;
    upper  = upper === true ;

    let gb ;

    let r = value >> 16 ; gb = value ^ r << 16 ;
    let g = gb >> 8 ;
    let b = gb^g << 8 ;

    return prefix + hex( r , upper ) + hex( g , upper ) + hex( b , upper ) ;
}

function hex( value , upper = true )
{
    let hex = value.toString( 16 ) ;
    hex = hex.length % 2 === 0 ? hex : "0" + hex ;
    return upper ? hex.toUpperCase() : hex ;
}