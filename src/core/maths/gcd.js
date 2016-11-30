"use strict" ;

/**
 * Returns the greatest common divisor with the Euclidean algorithm.
 * @name floor
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} i1 - The first integer value.
 * @param {number} i2 - The second integer value.
 * @return the greatest common divisor with the Euclidean algorithm.
 * @example
 * trace("gcd(320,240) : " + gcd(320,240) ) ; // gcd(320,240) : 80
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
        var t  ;
        while( i2 !== 0 )
        {
            t  = i2 ;
            i2 = i1 % i2 ;
            i1 = t ;
        }
        return i1 ;
    }
}

