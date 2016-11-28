"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Converts radians to degrees.
 * @name radiansToDegrees
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} angle - Value, in radians, to convert to degrees.
 * @return an angle in degrees.
 */
export function radiansToDegrees( angle /*Number*/) /*Number*/
{
    return angle * RAD2DEG ;
}
