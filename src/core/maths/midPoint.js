"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;
import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the midpoint along a great circle path between the two points.
 * @see <a href="http://mathforum.org/library/drmath/view/51822.html">"Latitude and Longitude of a Point Halfway between Two Points"</a> question to calculate the derivation.</p>
 * @name midPoint
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} latitude1 - The first latitude coordinate.
 * @param {number} longitude1 - The first longitude coordinate.
 * @param {number} latitude2 - The second latitude coordinate.
 * @param {number} longitude2 - The second longitude coordinate.
 * @return The midpoint (Object) along a great circle path between the two points.
 * @example
 * var pos1 = { x : 34.122222   , y : 118.4111111 } ; // LA
 * var pos2 = { x : 40.66972222 , y : 73.94388889 } ; // NYC
 * var result = midPoint( pos1.x , pos1.y , pos2.x , pos2.y )  ;
 * trace( "midpt latitude:" + result.x + " longitude:" + result.y ) ;// midpt latitude:39.547078603870254 longitude:97.2015133919303
 */
export var midPoint = ( latitude1, longitude1, latitude2, longitude2 ) =>
{
    let dLng = ( longitude2 - longitude1 ) * DEG2RAD ;

    latitude1  = latitude1  * DEG2RAD ;
    longitude1 = longitude1 * DEG2RAD ;
    latitude2  = latitude2  * DEG2RAD ;

    let bx = Math.cos( latitude2 ) * Math.cos( dLng );
    let by = Math.cos( latitude2 ) * Math.sin( dLng ) ;

    let point =
    {
        x : Math.atan2( Math.sin( latitude1 ) + Math.sin( latitude2 ), Math.sqrt( ( Math.cos( latitude1 ) + bx ) * ( Math.cos( latitude1 ) + bx ) + by * by ) ) * RAD2DEG ,
        y : ( longitude1 + Math.atan2( by , Math.cos( latitude1 ) + bx ) ) * RAD2DEG
    }

    return point ;
}
