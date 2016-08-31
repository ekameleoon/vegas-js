"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Returns the inverse cosine of a slope ratio and returns its angle in degrees.
 * @param ratio a value between -1 and 1 inclusive.
 * @return the inverse cosine of a slope ratio and returns its angle in degrees.
 */
export var acosD = ( ratio ) => Math.acos( ratio ) * RAD2DEG ;
