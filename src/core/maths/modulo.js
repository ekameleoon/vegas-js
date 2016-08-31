"use strict" ;

/**
 * The % operator in ECMASCript returns the remainder of a / b, but differs from some other languages in that the result will have the same sign as the dividend.
 * For example, -1 % 8 == -1, whereas in some other languages (such as Python) the result would be 7.
 * This function emulates the more correct modulo behavior, which is useful for certain applications such as calculating an offset index in a circular list.
 * @param a The dividend.
 * @param b The divisor.
 * @return The a % b where the result is between 0 and b (either 0 <= x < b or b < x <= 0, depending on the sign of b).
 */
export function modulo( a , b )
{
    var r = a % b;
    return ( r * b < 0 ) ? r + b : r ; // If r and b differ in sign, add b to wrap the result to the correct sign.
}
