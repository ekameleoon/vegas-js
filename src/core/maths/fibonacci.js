"use strict" ;

/**
 * Calculates with the fibonacci sequence the value with a specific level.
 * By definition, the first two numbers in the Fibonacci sequence are 0 and 1, and each subsequent number is the sum of the previous two.
 * @name fibonacci
 * @memberof core.maths
 * @instance
 * @function
 */
export var fibonacci = ( value ) =>
{
    let i = 1 ;
    let j = 0 ;
    for( let k = 1 ; k <= value ; k++ )
    {
        [i,j] = [j,i+j] ;
    }
    return j ;
}
