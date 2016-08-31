"use strict" ;

/**
 * Anti-hyperbolic cosine.
 * <pre>
 * acoshp = ln(x+√(x^2-1))
 * </pre>
 */
export var acosHp = ( x /*Number*/ ) => Math.log(x + Math.sqrt(x * x - 1));