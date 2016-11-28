"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the arctangent of the passed angle.
 * @name atanD
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} angle - A real number
 * @return the arctangent of the passed angle, a number between <code>-Math.PI/2</code> and <code>Math.PI/2</code> inclusive.
 */
export var atanD = ( angle ) => Math.atan( angle ) * RAD2DEG ;