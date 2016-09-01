"use strict" ;

import '../polyfill.js' ;

import { acosD }                  from './maths/acosD.js' ;
import { acosHm }                 from './maths/acosHm.js' ;
import { acosHp }                 from './maths/acosHp.js' ;
import { angleOfLine }            from './maths/angleOfLine.js' ;
import { asinD }                  from './maths/asinD.js' ;
import { asinH }                  from './maths/asinH.js' ;
import { atan2D }                 from './maths/atan2D.js' ;
import { atanD }                  from './maths/atanD.js' ;
import { atanH }                  from './maths/atanH.js' ;
import { bearing }                from './maths/bearing.js' ;
import { berp }                   from './maths/berp.js' ;
import { bounce }                 from './maths/bounce.js' ;
import { cartesianToPolar }       from './maths/cartesianToPolar.js' ;
import { ceil }                   from './maths/ceil.js' ;
import { clamp }                  from './maths/clamp.js' ;
import { clerp }                  from './maths/clerp.js' ;
import { cosD }                   from './maths/cosD.js' ;
import { coserp }                 from './maths/coserp.js' ;
import { cosH }                   from './maths/cosH.js' ;
import { DEG2RAD }                from './maths/DEG2RAD.js' ;
import { degreesToRadians }       from './maths/degreesToRadians.js' ;
import { distance }               from './maths/distance.js' ;
import { distanceByObject }       from './maths/distanceByObject.js' ;
import { EARTH_RADIUS_IN_METERS } from './maths/EARTH_RADIUS_IN_METERS.js' ;
import { EPSILON }                from './maths/EPSILON.js' ;
import { fibonacci }              from './maths/fibonacci.js' ;
import { finalBearing }           from './maths/finalBearing.js' ;
import { fixAngle }               from './maths/fixAngle.js' ;
import { floor }                  from './maths/floor.js' ;
import { gcd }                    from './maths/gcd.js' ;
import { haversine }              from './maths/haversine.js' ;
import { hermite }                from './maths/hermite.js' ;
import { hypothenuse }            from './maths/hypothenuse.js' ;
import { interpolate }            from './maths/interpolate.js' ;
import { isEven }                 from './maths/isEven.js' ;
import { isOdd }                  from './maths/isOdd.js' ;
import { LAMBDA }                 from './maths/LAMBDA.js' ;
import { lerp }                   from './maths/lerp.js' ;
import { log10 }                  from './maths/log10.js' ;
import { logN }                   from './maths/logN.js' ;
import { map }                    from './maths/map.js' ;
import { midPoint }               from './maths/midPoint.js' ;
import { MILE_TO_METER }          from './maths/MILE_TO_METER.js' ;
import { modulo }                 from './maths/modulo.js' ;
import { nearlyEquals }           from './maths/nearlyEquals.js' ;
import { normalize }              from './maths/normalize.js' ;
import { percentage }             from './maths/percentage.js' ;
import { PHI }                    from './maths/PHI.js' ;
import { polarToCartesian }       from './maths/polarToCartesian.js' ;
import { RAD2DEG }                from './maths/RAD2DEG.js' ;
import { replaceNaN }             from './maths/replaceNaN.js' ;
import { round }                  from './maths/round.js' ;
import { sign }                   from './maths/sign.js' ;
import { sinD }                   from './maths/sinD.js' ;
import { sinerp }                 from './maths/sinerp.js' ;
import { sinH }                   from './maths/sinH.js' ;
import { tanD }                   from './maths/tanD.js' ;
import { tanH }                   from './maths/tanH.js' ;
import { vincenty }               from './maths/vincenty.js' ;

/**
 * The VEGAS.js framework - The core.maths library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */
export var maths = Object.assign
({
    acosD : acosD,
    acosHm : acosHm,
    acosHp : acosHp,
    angleOfLine : angleOfLine,
    asinD : asinD,
    asinH : asinH,
    atan2D : atan2D,
    atanD : atanD,
    atanH : atanH,
    bearing : bearing,
    berp : berp,
    bounce : bounce,
    cartesianToPolar : cartesianToPolar,
    ceil : ceil,
    clamp : clamp,
    clerp : clerp,
    cosD : cosD,
    coserp : coserp,
    cosH : cosH,
    DEG2RAD : DEG2RAD,
    degreesToRadians : degreesToRadians,
    distance : distance,
    distanceByObject : distanceByObject,
    EARTH_RADIUS_IN_METERS : EARTH_RADIUS_IN_METERS,
    EPSILON : EPSILON,
    fibonacci : fibonacci,
    finalBearing : finalBearing,
    fixAngle : fixAngle,
    floor : floor,
    gcd : gcd,
    haversine : haversine,
    hermite : hermite,
    hypothenuse : hypothenuse,
    interpolate : interpolate,
    isEven : isEven,
    isOdd : isOdd,
    LAMBDA : LAMBDA,
    lerp : lerp,
    log10 : log10,
    logN : logN,
    map : map,
    midPoint : midPoint,
    MILE_TO_METER : MILE_TO_METER,
    modulo : modulo,
    nearlyEquals : nearlyEquals,
    normalize : normalize,
    percentage : percentage,
    PHI : PHI,
    polarToCartesian : polarToCartesian,
    RAD2DEG : RAD2DEG,
    replaceNaN : replaceNaN,
    round : round,
    sign : sign,
    sinD : sinD,
    sinerp : sinerp,
    sinH : sinH,
    tanD : tanD,
    tanH : tanH,
    vincenty : vincenty
}) ;