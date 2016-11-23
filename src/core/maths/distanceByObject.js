"use strict" ;

/**
 * Returns the distance between 2 points with the coordinates of the 2 points.
 * @name distanceByObject
 * @memberof core.maths
 * @function
 * @param {graphics.geom.Vector2|graphics.geom.Point|Object} p1 the first point to determinate the distance (defines with the x and y coordinates).
 * @param {graphics.geom.Vector2|graphics.geom.Point|Object} p2 the second point to determinate the distance (defines with the x and y coordinates).
 * @return the length between 2 points.
 */
export function distanceByObject( p1 , p2 )
{
    var dx = p2.x - p1.x ;
    var dy = p2.y - p1.y ;
    return Math.sqrt( ( dx * dx ) + ( dy * dy ) ) ;
}
