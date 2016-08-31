"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;

/**
 * Calculates the tangent of the passed angle.
 * @param angle a value representing angle in degrees.
 * @return the tangent of the passed angle.
 */
export var tanD = ( angle ) => Math.tan( angle * DEG2RAD ) ;