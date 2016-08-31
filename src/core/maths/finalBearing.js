"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;
import { RAD2DEG } from './RAD2DEG.js' ;

/**
 * Calculates the final bearing from a specific points to a supplied point, in degrees. For final bearing, simply take the initial bearing from the end point to the start point and reverse it (using θ = (θ+180) % 360).
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var finalBearing = core.maths.finalBearing ;
 *
 * var position1 = new Point( 37.422045 , -122.084347 ) ; // Google HQ
 * var position2 = new Point( 37.77493  , -122.419416 ) ; // San Francisco, CA
 *
 * trace( finalBearing( position1.x , position1.y , position2.x , position2.y ) ) ; // 143.1477743368166
 * </pre>
 * @param latitude1 The first latitude coordinate.
 * @param longitude1 The first longitude coordinate.
 * @param latitude2 The second latitude coordinate.
 * @param longitude2 The second longitude coordinate.
 * @return The bearing in degrees from North.
 */
export var finalBearing = ( latitude1, longitude1, latitude2, longitude2 ) =>
{
    latitude1 = latitude1 * DEG2RAD ;
    latitude2 = latitude2 * DEG2RAD ;

    var dLng = ( longitude2 - longitude1 ) * DEG2RAD ;

    var y = Math.sin( dLng ) * Math.cos( latitude2 ) ;
    var x = Math.cos( latitude1 ) * Math.sin( latitude2 ) - Math.sin( latitude1 ) * Math.cos( latitude2 ) * Math.cos( dLng ) ;

    return ((Math.atan2(y, x)) * RAD2DEG + 180) % 360 ;
}
