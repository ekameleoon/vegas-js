"use strict" ;

import { cosH } from './cosH.js' ;
import { sinH } from './sinH.js' ;

/**
 * Calculates the Hyperbolic tangent.
 * @name tanH
 * @memberof core.maths
 * @function
 * @param {number} x - A value to calculates.
 * @return The Hyperbolic tangent of the specified value.
 */
export var tanH = ( x ) => sinH(x) / cosH(x) ;
