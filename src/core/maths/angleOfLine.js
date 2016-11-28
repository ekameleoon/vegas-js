"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Returns the angle in degrees between 2 points with this coordinates passed in argument.
 * @name angleOfLine
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} x1 - The x coordinate of the first point.
 * @param {number} y1 - The y coordinate of the first point.
 * @param {number} x2 - The x coordinate of the second point.
 * @param {number} y2 - The y coordinate of the second point.
 * @return the angle in degrees between 2 points with this coordinates passed in argument.
 */
export var angleOfLine = ( x1 , y1 , x2 , y2 ) => Math.atan2( y2 - y1 , x2 - x1 ) * RAD2DEG ;
