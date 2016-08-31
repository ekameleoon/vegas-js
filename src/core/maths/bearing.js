"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;
import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the initial bearing (sometimes referred to as forward azimuth) which if followed in a straight line along a great-circle arc will take you from the start point to the end point (in degrees).
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var bearing = core.maths.bearing ;
 *
 * var position1 = { x : 37.422045 , y : -122.084347 } ; // Google HQ
 * var position2 = { x :  37.77493 , y : -122.419416 } ; // San Francisco, CA
 *
 * trace( bearing( position1.x , position1.y , position2.x , position2.y ) ) ; // 323.1477743368166
 * </pre>
 * @param latitude1 The first latitude coordinate.
 * @param longitude1 The first longitude coordinate.
 * @param latitude2 The second latitude coordinate.
 * @param longitude2 The second longitude coordinate.
 * @return The bearing in degrees from North.
 */
export var bearing = ( latitude1, longitude1, latitude2, longitude2 ) =>
{
    latitude1 = latitude1 * DEG2RAD ;
    latitude2 = latitude2 * DEG2RAD ;

    var dLng = ( longitude2 - longitude1 ) * DEG2RAD ;

    var y = Math.sin( dLng ) * Math.cos( latitude2 ) ;
    var x = Math.cos( latitude1 )*Math.sin( latitude2 ) - Math.sin( latitude1 ) * Math.cos( latitude2 ) * Math.cos( dLng ) ;

    return ((Math.atan2(y, x)) * RAD2DEG + 360) % 360 ;
}
