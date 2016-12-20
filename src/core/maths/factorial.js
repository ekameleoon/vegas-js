"use strict" ;

/**
 * Calculates with the product of all positive integers less than or equal to <code>value</code>.
 * @name factorial
 * @memberof core.maths
 * @instance
 * @function
 * @param {number} value - The positive integer to limit the factorial equation.
 * @return The product of all positive integers less than or equal to <code>value</code>.
 * @example
 * trace( factorial( 0 ) ) ; // 1
 * trace( factorial( 1 ) ) ; // 1
 * trace( factorial( 2 ) ) ; // 2
 * trace( factorial( 3 ) ) ; // 6
 * trace( factorial( 4 ) ) ; // 24
 */
export var factorial = ( value ) =>
{
    if( value === 0 )
    {
        return 1 ;
    }

    let result = value ;

    while (--value)
    {
        result *= value ;
    }

    return result ;
}
