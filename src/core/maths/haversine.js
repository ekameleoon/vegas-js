"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;
import { EARTH_RADIUS_IN_METERS } from './EARTH_RADIUS_IN_METERS.js' ;

/**
 * The haversine formula is an equation important in navigation, giving great-circle distances between two points on a sphere from
 * their longitudes and latitudes.This algorithm is way faster than the Vincenty Formula but less accurate.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * var haversine = core.maths.haversine ;
 *
 * var position1 = { x : 37.422045 , y : -122.084347  } ; // Google HQ
 * var position2 = { x : 37.77493  , y : -122.419416 } ; // San Francisco, CA
 *
 * trace( haversine( position1.x , position1.y , position2.x , position2.y ) ) ; // 49 103.007 meters
 * </pre>
 * @param latitude1 The first latitude coordinate.
 * @param longitude1 The first longitude coordinate.
 * @param latitude2 The second latitude coordinate.
 * @param longitude2 The second longitude coordinate.
 * @param radius The optional radius of the sphere (by default the function use the earth's radius, mean radius = 6,371km) .
 * @return The distance between two points on a sphere from their longitudes and latitudes.
 * @see core.maths.EARTH_RADIUS_IN_METERS
 */
export var haversine = ( latitude1, longitude1, latitude2, longitude2 , radius ) =>
{
    if( isNaN(radius) )
    {
        radius = EARTH_RADIUS_IN_METERS ;
    }

    var dLat = ( latitude2  - latitude1  ) * DEG2RAD;
    var dLng = ( longitude2 - longitude1 ) * DEG2RAD;

    var a = Math.sin( dLat * 0.5 ) * Math.sin( dLat * 0.5 ) + Math.cos( latitude1 * DEG2RAD ) * Math.cos( latitude2 * DEG2RAD ) * Math.sin( dLng/2 ) * Math.sin( dLng/2 );
    var c = Number ( ( ( 2 * Math.atan2( Math.sqrt(a) , Math.sqrt(1-a) ) ) * radius ).toFixed(3) ) ;

    return ( c === c ) ? c : 0 ;
}
