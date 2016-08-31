"use strict" ;

import './polyfill.js' ;

/**
 * The VEGAS.js framework - The core library.
 * @licence MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 */

// core
import { dump } from './core/dump.js' ;

// core.arrays
import { contains }   from './core/arrays/contains.js' ;
import { initialize } from './core/arrays/initialize.js' ;
import { pierce }     from './core/arrays/pierce.js' ;
import { repeat }     from './core/arrays/repeat.js' ;
import { shuffle }    from './core/arrays/shuffle.js' ;
import { sortOn }     from './core/arrays/sortOn.js' ;
import { spliceInto } from './core/arrays/spliceInto.js' ;

// core.chars
import { compare as ccompare } from './core/chars/compare.js' ;
import { isAlpha }             from './core/chars/isAlpha.js' ;
import { isASCII }             from './core/chars/isASCII.js' ;
import { isDigit }             from './core/chars/isDigit.js' ;
import { isHexDigit }          from './core/chars/isHexDigit.js' ;
import { isLower }             from './core/chars/isLower.js' ;
import { isOctalDigit }        from './core/chars/isOctalDigit.js' ;
import { isOperator }          from './core/chars/isOperator.js' ;
import { isUnicode }           from './core/chars/isUnicode.js' ;
import { isUpper }             from './core/chars/isUpper.js' ;

// core.maths
import { acosD }                  from './core/maths/acosD.js' ;
import { acosHm }                 from './core/maths/acosHm.js' ;
import { acosHp }                 from './core/maths/acosHp.js' ;
import { angleOfLine }            from './core/maths/angleOfLine.js' ;
import { asinD }                  from './core/maths/asinD.js' ;
import { asinH }                  from './core/maths/asinH.js' ;
import { atan2D }                 from './core/maths/atan2D.js' ;
import { atanD }                  from './core/maths/atanD.js' ;
import { atanH }                  from './core/maths/atanH.js' ;
import { bearing }                from './core/maths/bearing.js' ;
import { berp }                   from './core/maths/berp.js' ;
import { bounce }                 from './core/maths/bounce.js' ;
import { cartesianToPolar }       from './core/maths/cartesianToPolar.js' ;
import { ceil }                   from './core/maths/ceil.js' ;
import { clamp }                  from './core/maths/clamp.js' ;
import { clerp }                  from './core/maths/clerp.js' ;
import { cosD }                   from './core/maths/cosD.js' ;
import { coserp }                 from './core/maths/coserp.js' ;
import { cosH }                   from './core/maths/cosH.js' ;
import { DEG2RAD }                from './core/maths/DEG2RAD.js' ;
import { degreesToRadians }       from './core/maths/degreesToRadians.js' ;
import { distance }               from './core/maths/distance.js' ;
import { distanceByObject }       from './core/maths/distanceByObject.js' ;
import { EARTH_RADIUS_IN_METERS } from './core/maths/EARTH_RADIUS_IN_METERS.js' ;
import { EPSILON }                from './core/maths/EPSILON.js' ;
import { fibonacci }              from './core/maths/fibonacci.js' ;
import { finalBearing }           from './core/maths/finalBearing.js' ;
import { fixAngle }               from './core/maths/fixAngle.js' ;
import { floor }                  from './core/maths/floor.js' ;
import { gcd }                    from './core/maths/gcd.js' ;
import { haversine }              from './core/maths/haversine.js' ;
import { hermite }                from './core/maths/hermite.js' ;
import { hypothenuse }            from './core/maths/hypothenuse.js' ;
import { interpolate }            from './core/maths/interpolate.js' ;
import { isEven }                 from './core/maths/isEven.js' ;
import { isOdd }                  from './core/maths/isOdd.js' ;
import { LAMBDA }                 from './core/maths/LAMBDA.js' ;
import { lerp }                   from './core/maths/lerp.js' ;
import { log10 }                  from './core/maths/log10.js' ;
import { logN }                   from './core/maths/logN.js' ;
import { map }                    from './core/maths/map.js' ;
import { midPoint }               from './core/maths/midPoint.js' ;
import { MILE_TO_METER }          from './core/maths/MILE_TO_METER.js' ;
import { modulo }                 from './core/maths/modulo.js' ;
import { nearlyEquals }           from './core/maths/nearlyEquals.js' ;
import { normalize }              from './core/maths/normalize.js' ;
import { percentage }             from './core/maths/percentage.js' ;
import { PHI }                    from './core/maths/PHI.js' ;
import { polarToCartesian }       from './core/maths/polarToCartesian.js' ;
import { RAD2DEG }                from './core/maths/RAD2DEG.js' ;
import { replaceNaN }             from './core/maths/replaceNaN.js' ;
import { round }                  from './core/maths/round.js' ;
import { sign }                   from './core/maths/sign.js' ;
import { sinD }                   from './core/maths/sinD.js' ;
import { sinerp }                 from './core/maths/sinerp.js' ;
import { sinH }                   from './core/maths/sinH.js' ;
import { tanD }                   from './core/maths/tanD.js' ;
import { tanH }                   from './core/maths/tanH.js' ;
import { vincenty }               from './core/maths/vincenty.js' ;

// core.numbers
import { toUnicodeNotation } from './core/numbers/toUnicodeNotation.js' ;

// core.objects
import { members } from './core/objects/members.js' ;
import { merge }   from './core/objects/merge.js' ;

// core.random
import { generateUUID } from './core/random/generateUUID.js' ;

// core.strings
import { camelCase }           from './core/strings/camelCase.js' ;
import { capitalize }          from './core/strings/capitalize.js' ;
import { caseValue }           from './core/strings/caseValue.js' ;
import { center }              from './core/strings/center.js' ;
import { clean }               from './core/strings/clean.js' ;
import { endsWith }            from './core/strings/endsWith.js' ;
import { fastformat }          from './core/strings/fastformat.js' ;
import { format }              from './core/strings/format.js' ;
import { hyphenate }           from './core/strings/hyphenate.js' ;
import { indexOfAny }          from './core/strings/indexOfAny.js' ;
import { insert }              from './core/strings/insert.js' ;
import { lastIndexOfAny }      from './core/strings/lastIndexOfAny.js' ;
import { lineTerminatorChars } from './core/strings/lineTerminatorChars.js' ;
import { pad }                 from './core/strings/pad.js' ;
import { repeat as arepeat }   from './core/strings/repeat.js' ;
import { startsWith }          from './core/strings/startsWith.js' ;
import { trim }                from './core/strings/trim.js' ;
import { trimEnd }             from './core/strings/trimEnd.js' ;
import { trimStart }           from './core/strings/trimStart.js' ;
import { ucFirst }             from './core/strings/ucFirst.js' ;
import { ucWords }             from './core/strings/ucWords.js' ;
import { whiteSpaceChars }     from './core/strings/whiteSpaceChars.js' ;

export var core = Object.assign
({
    dump   : dump ,
    arrays :
    {
        contains : contains ,
        initialize : initialize ,
        pierce : pierce ,
        repeat : repeat ,
        shuffle : shuffle ,
        sortOn : sortOn ,
        spliceInto : spliceInto
    },
    chars :
    {
        compare : ccompare ,
        isAlpha : isAlpha ,
        isASCII : isASCII ,
        isDigit : isDigit ,
        isHexDigit : isHexDigit ,
        isLower : isLower ,
        isOctalDigit : isOctalDigit ,
        isOperator : isOperator ,
        isUnicode : isUnicode ,
        isUpper : isUpper
    },
    maths :
    {
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
    },
    numbers :
    {
        toUnicodeNotation : toUnicodeNotation
    },
    objects :
    {
        members : members,
        merge : merge
    },
    random :
    {
        generateUUID : generateUUID
    },
    strings :
    {
        camelCase : camelCase ,
        capitalize : capitalize ,
        caseValue : caseValue ,
        center : center ,
        clean : clean ,
        endsWith : endsWith ,
        fastformat : fastformat ,
        format : format ,
        hyphenate : hyphenate ,
        indexOfAny : indexOfAny ,
        insert : insert ,
        lastIndexOfAny : lastIndexOfAny ,
        lineTerminatorChars : lineTerminatorChars ,
        pad : pad ,
        repeat : arepeat ,
        startsWith : startsWith ,
        trim : trim ,
        trimEnd : trimEnd ,
        trimStart : trimStart ,
        ucFirst : ucFirst ,
        ucWords : ucWords ,
        whiteSpaceChars : whiteSpaceChars
    }
}) ;