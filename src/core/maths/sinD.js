"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;

/**
 * Calculates the sine of the passed angle.
 * @name sinD
 * @memberof core.maths
 * @function
 * @param {number} angle - A value in degrees.
 * @return The sine of the passed angle, a number between <code>-1</code> and <code>1</code> inclusive.
 */
export var sinD = ( angle ) => Math.sin( angle * DEG2RAD ) ;