"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the arcsine of the passed angle.
 * @name asinD
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} ratio - A value between <code>-1</code> and <code>1</code> inclusive.
 * @return the arcsine of the passed angle in degrees.
 */
export var asinD = ( ratio ) => Math.asin(ratio) * RAD2DEG ;
