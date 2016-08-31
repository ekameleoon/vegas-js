"use strict" ;

/**
 * Anti-hyperbolic tangent.
 */
export function atanH( x /*Number*/ ) /*Number*/
{
    return Math.log( ( 1 + x ) / ( 1 - x ) ) / 2 ;
}
