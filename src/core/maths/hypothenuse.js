"use strict" ;

/**
 * Calculates the hypothenuse value of the two passed-in triangle sides value.
 * <p>A hypotenuse is the longest side of a right triangle (Right-angled triangle in British English),
 * the side opposite the right angle. The length of the hypotenuse of a right triangle can be found using
 * the Pythagorean theorem, which states that the square of the length of the hypotenuse equals the sum of the squares
 * of the lengths of the other two sides.</p>
 */
export var hypothenuse = ( x , y ) => Math.sqrt( x*x + y*y );