"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the arctangent2 of the passed angle.
 * @param y a value representing y-axis of angle vector.
 * @param x a value representing x-axis of angle vector.
 * @return the arctangent2 of the passed angle.
 */
export var atan2D = ( y , x ) => Math.atan2( y , x ) * RAD2DEG ;