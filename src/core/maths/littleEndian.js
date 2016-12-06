"use strict" ;

import '../../polyfill/Uint32Array.js' ;

/**
 * Determinates if the device big or little endian and detected if the browser supports TypedArrays.
 * @name isLittleEndian
 * @memberof core.maths
 * @instance
 * @function
 * @private
 */
export var isLittleEndian = () =>
{
    var a = new ArrayBuffer(4);
    var b = new Uint8Array(a);
    var c = new Uint32Array(a);

    b[0] = 0xa1;
    b[1] = 0xb2;
    b[2] = 0xc3;
    b[3] = 0xd4;

    if ( c[0] === 0xd4c3b2a1 )
    {
        return true ;
    }
    if ( c[0] === 0xa1b2c3d4 )
    {
        return false ;
    }
    else
    {
        return null ;
    }
}

/**
 * This constant indicates if the device big or little endian and detected if the browser supports TypedArrays.
 * @name littleEndian
 * @memberof core.maths
 * @instance
 * @const
 * @type boolean
 */
export const littleEndian = isLittleEndian() ;
