"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the arcsine of the passed angle.
 * @param ratio a value between -1 and 1 inclusive.
 * @return the arcsine of the passeds angle in degrees.
 */
export var asinD = ( ratio ) => Math.asin(ratio) * RAD2DEG ;
