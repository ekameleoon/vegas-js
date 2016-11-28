"use strict" ;

/**
 * The % operator in ECMASCript returns the remainder of a / b, but differs from some other languages in that the result will have the same sign as the dividend.
 * For example, -1 % 8 == -1, whereas in some other languages (such as Python) the result would be 7.
 * This function emulates the more correct modulo behavior, which is useful for certain applications such as calculating an offset index in a circular list.
 * @name modulo
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} a - The dividend.
 * @param {number} b - The divisor.
 * @return The <code>a % b</code> where the result is between <code>0</code> and <code>b</code> (either <code>0 <= x < b or b < x <= 0</code>, depending on the sign of b).
 * @example
 * trace( modulo(-1,8) ) ; // 7
 */
export function modulo( a , b )
{
    var r = a % b;
    return ( r * b < 0 ) ? r + b : r ; // If r and b differ in sign, add b to wrap the result to the correct sign.
}
