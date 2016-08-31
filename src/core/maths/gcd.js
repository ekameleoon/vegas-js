"use strict" ;

/**
 * Returns the greatest common divisor with the Euclidean algorithm.
 * <p><b>Example :</b></p>
 * <pre>
 * var gcd = core.maths.gcd(320,240) ;
 * trace("gcd(320,240) : " + gcd ) ; // gcd(320,240) : 80
 * </pre>
 * @param i1 The first integer value.
 * @param i2 The second integer value.
 * @return the greatest common divisor with the Euclidean algorithm.
 */
export var gcd = ( i1 , i2 ) =>
{
    if ( i2 === 0 )
    {
        return i1 ;
    }
    else if ( i1 === i2 )
    {
        return i1 ;
    }
    else
    {
        var t /*int*/ ;
        while( i2 !== 0 )
        {
            t  = i2 ;
            i2 = i1 % i2 ;
            i1 = t ;
        }
        return i1 ;
    }
}

