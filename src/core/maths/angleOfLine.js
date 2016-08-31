"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Returns the angle in degrees between 2 points with this coordinates passed in argument.
 * @param x1 the x coordinate of the first point.
 * @param y1 the y coordinate of the first point.
 * @param x2 the x coordinate of the second point.
 * @param y2 the y coordinate of the second point.
 * @return the angle in degrees between 2 points with this coordinates passed in argument.
 */
export var angleOfLine = ( x1 , y1 , x2 , y2 ) => Math.atan2( y2 - y1 , x2 - x1 ) * RAD2DEG ;
