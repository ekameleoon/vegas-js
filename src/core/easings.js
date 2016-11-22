"use strict" ;

import '../polyfill.js' ;

import { backIn }        from './easings/backIn.js' ;
import { backInOut }     from './easings/backInOut.js' ;
import { backOut }       from './easings/backOut.js' ;
import { bounceIn }      from './easings/bounceIn.js' ;
import { bounceInOut }   from './easings/bounceInOut.js' ;
import { bounceOut }     from './easings/bounceOut.js' ;
import { circularIn }    from './easings/circularIn.js' ;
import { circularInOut } from './easings/circularInOut.js' ;
import { circularOut }   from './easings/circularOut.js' ;
import { cubicIn }       from './easings/cubicIn.js' ;
import { cubicInOut }    from './easings/cubicInOut.js' ;
import { cubicOut }      from './easings/cubicOut.js' ;
import { elasticIn }     from './easings/elasticIn.js' ;
import { elasticInOut }  from './easings/elasticInOut.js' ;
import { elasticOut }    from './easings/elasticOut.js' ;
import { expoIn }        from './easings/expoIn.js' ;
import { expoInOut }     from './easings/expoInOut.js' ;
import { expoOut }       from './easings/expoOut.js' ;
import { linear }        from './easings/linear.js' ;
import { quarticIn }     from './easings/quarticIn.js' ;
import { quarticInOut }  from './easings/quarticInOut.js' ;
import { quarticOut }    from './easings/quarticOut.js' ;
import { quinticIn }     from './easings/quinticIn.js' ;
import { quinticInOut }  from './easings/quinticInOut.js' ;
import { quinticOut }    from './easings/quinticOut.js' ;
import { regularIn }     from './easings/regularIn.js' ;
import { regularInOut }  from './easings/regularInOut.js' ;
import { regularOut }    from './easings/regularOut.js' ;
import { sineIn }        from './easings/sineIn.js' ;
import { sineInOut }     from './easings/sineInOut.js' ;
import { sineOut }       from './easings/sineOut.js' ;

/**
 * The VEGAS.js framework - The core.easings library.
 * @license MPL 1.1/GPL 2.0/LGPL 2.1
 * @author Marc Alcaraz <ekameleon@gmail.com>
 * @namespace core.easings
 * @memberof core
 */
export var easings = Object.assign
({
    backIn        : backIn ,
    backInOut     : backInOut ,
    backOut       : backOut ,
    bounceIn      : bounceIn ,
    bounceInOut   : bounceInOut ,
    bounceOut     : bounceOut ,
    circularIn    : circularIn ,
    circularInOut : circularInOut ,
    circularOut   : circularOut ,
    cubicIn       : cubicIn ,
    cubicInOut    : cubicInOut ,
    cubicOut      : cubicOut ,
    elasticIn     : elasticIn ,
    elasticInOut  : elasticInOut ,
    elasticOut    : elasticOut ,
    expoIn        : expoIn ,
    expoInOut     : expoInOut ,
    expoOut       : expoOut ,
    linear        : linear,
    quarticIn     : quarticIn ,
    quarticInOut  : quarticInOut ,
    quarticOut    : quarticOut,
    quinticIn     : quinticIn,
    quinticInOut  : quinticInOut,
    quinticOut    : quinticOut,
    regularIn     : regularIn,
    regularInOut  : regularInOut,
    regularOut    : regularOut,
    sineIn        : sineIn,
    sineInOut     : sineInOut,
    sineOut       : sineOut
}) ;