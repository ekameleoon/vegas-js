"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Converts an angle in radians in degrees.
 * @return an angle in radians in degrees.
 */
export function radiansToDegrees( angle /*Number*/) /*Number*/
{
    return angle * RAD2DEG ;
}
