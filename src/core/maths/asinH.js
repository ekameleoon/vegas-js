"use strict" ;

/**
 * Anti-hyperbolic sine.
 */
export var asinH = ( x ) => Math.log( x + Math.sqrt(x * x + 1) );