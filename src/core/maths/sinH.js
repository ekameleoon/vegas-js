"use strict" ;

/**
 * Calculates the Hyperbolic sine.
 * @name sinH
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} x - A value to calculates.
 * @return The Hyperbolic sine of the specified value.
 */
export var sinH = ( x ) => (Math.exp(x) - Math.exp(-x)) * 0.5 ;
