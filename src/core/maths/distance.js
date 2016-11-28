"use strict" ;

/**
 * Calculates the distance between 2 points.
 * @name distance
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} x1 - The x coordinate of the first point.
 * @param {number} y1 - The y coordinate of the first point.
 * @param {number} x2 - The x coordinate of the second point.
 * @param {number} y2 - The y coordinate of the second point.
 * @return the length between 2 points.
 */
export var distance = ( x1 , y1 , x2 , y2 ) =>
{
    var dx = x2 - x1 ;
    var dy = y2 - y1 ;
    return Math.sqrt( dx * dx + dy * dy ) ;
}
