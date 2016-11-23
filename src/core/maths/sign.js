"use strict" ;

/**
 * Returns 1 if the value is positive or -1.
 * @name sign
 * @memberof core.maths
 * @function
 * @example
 * var n ;
 *
 * n = core.maths.sign( -150 ) ;
 * trace ("n : " + n) ; // -1
 *
 * n = core.maths.sign( 200 ) ;
 * trace ("n : " + n) ; // 1
 *
 * n = core.maths.sign( 0 ) ;
 * trace ("n : " + n) ; // 1
 * @param {number} n - The number to defined this sign.
 * @return <code>1</code> if the value is positive or <code>-1</code>.
 * @throws Error if the passed-in value is <code>NaN</code>.
 */
export var sign = ( n ) =>
{
    if (isNaN( n ))
    {
        throw new Error( "sign failed, the passed-in value not must be NaN." ) ;
    }
    return ( n < 0 ) ? -1 : 1 ;
}
