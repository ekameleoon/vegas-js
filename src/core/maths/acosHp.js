"use strict" ;

/**
 * Anti-hyperbolic cosine.
 * <pre>
 * acoshp = ln(x+√(x^2-1))
 * </pre>
 * @name acosHp
 * @memberof core.maths
 * @function
 */
export var acosHp = ( x ) => Math.log(x + Math.sqrt(x * x - 1));