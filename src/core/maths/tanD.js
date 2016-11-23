"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;

/**
 * Calculates the tangent of the passed angle.
 * @name tanD
 * @memberof core.maths
 * @function
 * @param {number} angle - The angle in degrees.
 * @return The tangent of the passed angle.
 */
export var tanD = ( angle ) => Math.tan( angle * DEG2RAD ) ;