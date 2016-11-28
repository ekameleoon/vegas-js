"use strict" ;

/**
 * Anti-hyperbolic sine.
 * @name asinH
 * @memberof core.maths
 * @function
 * @instance
 */
export var asinH = ( x ) => Math.log( x + Math.sqrt(x * x + 1) );