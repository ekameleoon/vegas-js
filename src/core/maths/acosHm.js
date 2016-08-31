"use strict" ;

/**
 * Anti-hyperbolic cosine.
 * <pre>
 * acoshm = ln(x-√(x^2-1))
 * </pre>
 */
export var acosHm = ( x ) => Math.log( x - Math.sqrt( x * x - 1 ) );