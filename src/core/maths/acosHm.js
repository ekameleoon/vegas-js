"use strict" ;

/**
 * Anti-hyperbolic cosine : <code>acoshm = ln(x-√(x^2-1))</code>
 * @name acosHm
 * @memberof core.maths
 * @function
 * @param {number} x - A value to calculate the Anti-hyperbolic cosine.
 */
export var acosHm = ( x ) => Math.log( x - Math.sqrt( x * x - 1 ) );