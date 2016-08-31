"use strict" ;

/**
 * Returns 1 if the value is positive or -1.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
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
 * </pre>
 * @param n the number to defined this sign.
 * @return 1 if the value is positive or -1.
 * @throws Error if the passed-in value is NaN.
 */
export var sign = ( n ) =>
{
    if (isNaN( n ))
    {
        throw new Error( "sign failed, the passed-in value not must be NaN." ) ;
    }
    return ( n < 0 ) ? -1 : 1 ;
}
