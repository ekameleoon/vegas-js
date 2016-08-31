"use strict" ;

/**
 * Returns the distance between 2 points with the coordinates of the 2 points.
 * @param x1 the x coordinate of the first point.
 * @param y1 the y coordinate of the first point.
 * @param x2 the x coordinate of the second point.
 * @param y2 the y coordinate of the second point.
 * @return the length between 2 points.
 */
export var distance = ( x1 , y1 , x2 , y2 ) =>
{
    var dx = x2 - x1 ;
    var dy = y2 - y1 ;
    return Math.sqrt( dx * dx + dy * dy ) ;
}
