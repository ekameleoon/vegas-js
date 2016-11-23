"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the arctangent2 of the passed angle.
 * @name atan2D
 * @memberof core.maths
 * @function
 * @param {number} y - A value representing y-axis of angle vector.
 * @param {number} x - A value representing x-axis of angle vector.
 * @return the arctangent2 of the passed angle.
 */
export var atan2D = ( y , x ) => Math.atan2( y , x ) * RAD2DEG ;