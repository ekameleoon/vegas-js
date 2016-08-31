"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the arctangent of the passed angle.
 * @param angle a real number
 * @return the arctangent of the passed angle, a number between -Math.PI/2 and Math.PI/2 inclusive.
 */
export var atanD = ( angle ) => Math.atan( angle ) * RAD2DEG ;