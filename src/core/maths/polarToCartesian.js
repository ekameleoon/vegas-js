"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;

/**
 * Converts a Polar object in a cartesian vector.
 * @name polarToCartesian
 * @memberof core.maths
 * @function
 * @param {Object} polar The polar generic object to transform (with the attributes angle and radius).
 * @param {number} polar.angle The angle of the polar coordinates.
 * @param {number} polar.radius The radius of the polar coordinates.
 * @param {number} degrees Indicates if the angle of the polar object is in degrees or radians.
 * @return A generic Object with the cartesian representation of the specified Polar object (with the coordinates x and y).
 */
export var polarToCartesian = ( vector , degrees /*Boolean*/ ) =>
{
    var angle  = vector.angle ;
    var radius = vector.radius ;
    if ( degrees )
    {
        angle *= DEG2RAD ;
    }
    return { x : radius * Math.cos( angle ) , y : radius * Math.sin( angle ) } ;
}
