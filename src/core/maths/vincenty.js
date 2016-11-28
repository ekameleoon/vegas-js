"use strict" ;

import { DEG2RAD } from './DEG2RAD.js' ;

/**
 * Calculates geodesic distance in meter between two points specified by latitude and longitude (in numeric degrees)
 * using the Vincenty inverse formula for ellipsoids. This algorithm is slow but very accurate (down to 0.5 mm).
 * <p>See the original reference about this formula : <a href="http://www.ngs.noaa.gov/PUBS_LIB/inverse.pdf">Direct and Inverse Solutions of Geodesics on the Ellipsoid with application of nested equations</a>.</p>
 * @name vincenty
 * @memberof core.maths
 * @function
 * @instance
 * @example
 * var position1 = { x : 37.422045,  y : -122.084347 } ; // Google HQ
 * var position2 = { x : 37.77493  , y : -122.419416 } ; // San Francisco, CA
 *
 * trace( vincenty( position1.x , position1.y , position2.x , position2.y ) ) ; // 49 087.066 meters
 * @param {number} latitude1 - The first latitude coordinate.
 * @param {number} longitude1 - The first longitude coordinate.
 * @param {number} latitude2 - The second latitude coordinate.
 * @param {number} longitude2 - The second longitude coordinate.
 * @return The distance between two points on a sphere from their longitudes and latitudes.
 */
export function vincenty( latitude1, longitude1, latitude2, longitude2 ) /*Number*/
{
    // World Geodetic System (WGS-84 ellipsoid parameters)
    const a = 6378137;
    const b = 6356752.3142 ;
    const f = 1 / 298.257223563 ;

    // Algorithm
    var L = (longitude2 - longitude1) * DEG2RAD;

    var U1 = Math.atan((1 - f) * Math.tan( latitude1 * DEG2RAD ) );
    var U2 = Math.atan((1 - f) * Math.tan( latitude2 * DEG2RAD ) );

    var sinU1 = Math.sin(U1), cosU1 = Math.cos(U1);
    var sinU2 = Math.sin(U2), cosU2 = Math.cos(U2);

    var lambda = L ;
    var lambdaP = 2 * Math.PI;

    var iterLimit = 20;

    var cosLambda ;
    var sinLambda ;

    var cosSigma ;
    var sinSigma ;

    var sigma ;

    var sinAlpha ;

    var cosSqAlpha ;
    var cos2SigmaM ;

    var C ;

    do
    {
        sinLambda = Math.sin( lambda ) ;
        cosLambda = Math.cos( lambda ) ;

        sinSigma  = Math.sqrt((cosU2 * sinLambda) * (cosU2 * sinLambda) + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) * (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda));

        if ( sinSigma === 0 )
        {
            return 0 ; // co-incident points
        }

        cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda ;

        sigma = Math.atan2( sinSigma , cosSigma ) ;

        sinAlpha   = cosU1 * cosU2 * sinLambda / sinSigma;

        cosSqAlpha = 1 - sinAlpha * sinAlpha;

        cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;

        if( isNaN( cos2SigmaM ) )
        {
            cos2SigmaM = 0 ; // equatorial line: cosSqAlpha=0 (§6)
        }

        C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));

        lambdaP = lambda;

        lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM)));
    }
    while ( Math.abs(lambda - lambdaP) > 1e-12 && --iterLimit > 0 ) ;

    if ( iterLimit === 0 )
    {
        return NaN ; // formula failed to converge
    }

    var uSq = cosSqAlpha * (a * a - b * b) / (b * b);
    var A   = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    var B   = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    var deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM * cos2SigmaM) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma * sinSigma) * (-3 + 4 * cos2SigmaM * cos2SigmaM)));

    var s = b * A * ( sigma - deltaSigma ) ;

    s = Number(s.toFixed(3)) ; // round to 1mm precision

    return s;
}
