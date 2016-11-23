"use strict" ;

/**
 * Hyperbolic cosine.
 * @name cosH
 * @memberof core.maths
 * @function
 * @param {number} x - A value to calculate the Hyperbolic cosine.
 */
export var cosH = ( x ) => ( Math.exp(x) + Math.exp(-x) ) / 2 ;