"use strict" ;

/**
 * Anti-hyperbolic tangent.
 * @name atanH
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} x - A real number
 * @return the Anti-hyperbolic tangent of the passed angle.
 */
export var atanH = ( x ) => Math.log( ( 1 + x ) / ( 1 - x ) ) / 2 ;
