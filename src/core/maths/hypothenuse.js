"use strict" ;

/**
 * Computes square root of sum of two arguments (Computes hypotenuse).
 * <p>A hypotenuse is the longest side of a right triangle (Right-angled triangle in British English), the side opposite the right angle. The length of the hypotenuse of a right triangle can be found using the Pythagorean theorem, which states that the square of the length of the hypotenuse equals the sum of the square of the lengths of the other two sides.</p>
 * @name hypothenuse
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} x - Specifies the length of first side
 * @param {number} y - Specifies the length of second side
 * @return The length of the hypotenuse
 * @example
 * trace( hypothenuse(5,12) ) ; // 13
 */
export var hypothenuse = ( x , y ) => Math.sqrt( x*x + y*y );