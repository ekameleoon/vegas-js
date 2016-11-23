"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;

/**
 * Converts degrees to radians.
 * @name degreesToRadians
 * @memberof core.maths
 * @function
 * @param {number} angle - Value, in degrees, to convert to radians.
 * @return The angle in radians.
 */
export var degreesToRadians = ( angle ) => angle * DEG2RAD ;