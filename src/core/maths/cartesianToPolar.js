"use strict" ;

import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Converts a vector in cartesian in a polar vector. Return a generic object with the properties angle and radius.
 * @name cartesianToPolar
 * @memberof core.maths
 * @function
 * @instance
 * @param {graphics.geom.Vector2|graphics.geom.Point|Objectj} vector - The cartesian vector to transform.
 * @param {boolean} degrees - Indicates if the angle attribute in the return polar object is in degrees or not (default this parameter is false).
 * @return a vector in cartesian in a polar vector.
 */
export var cartesianToPolar = ( vector , degrees ) => ( { angle : Math.atan2(vector.y,vector.x) * ( Boolean(degrees) ? RAD2DEG : 1 ) , radius : Math.sqrt(vector.x*vector.x+vector.y*vector.y) } ) ;