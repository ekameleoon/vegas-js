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
    var t ;
    var j ;
    var i = 1 ;
    for ( var k = 1 ; k <= value ; k++ )
    {
        t = i + j ;
        i = j ;
        j = t ;
    }
    return j ;
}
