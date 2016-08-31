"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;

/**
 * Calculates the sine of the passed angle.
 * @param angle a value representing angle in degrees.
 * @return the sine of the passed angle, a number between -1 and 1 inclusive.
 */
export var sinD = ( angle ) => Math.sin( angle * DEG2RAD ) ;