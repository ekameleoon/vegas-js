"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;

/**
 * Calculates the cosine of the passed angle.
 * @name cosD
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} angle - A value representing angle in degrees.
 * @return the cosine of the passed angle, a number between -1 and 1 inclusive.
 */
export var cosD = ( angle ) => Math.cos( angle * DEG2RAD ) ;
