"use strict" ;

import '../polyfill/Object.js' ;

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
 * The {@link system.transitions} package use the {@link core.easings} library who contains all the easing functions to create the specific <b>tweening</b> effects.
 * <p>These easings functions provide different flavors of math-based motion under a consistent API.</p>
 *
 * |  easing   |                         description                         |  in  | out  | inout  |
 * |:--------: |:----------------------------------------------------------: |:---: |:---: |:-----: |
 * |  linear   | simple linear tweening : no easing, no acceleration         |  -   |  -   |   -    |
 * |   back    | back easing : overshooting cubic easing: (s+1)*t^3 - s*t^2  | yes  | yes  |  yes   |
 * |  bounce   | bounce easing : exponentially decaying parabolic bounce     | yes  | yes  |  yes   |
 * | circular  | circular easing : sqrt(1-t^2)                               | yes  | yes  |  yes   |
 * |   cubic   | cubic easing : t^3                                          | yes  | yes  |  yes   |
 * |  elastic  | elastic easing : exponentially decaying sine wave           | yes  | yes  |  yes   |
 * |   expo    | exponential easing : 2^t                                    | yes  | yes  |  yes   |
 * |   quad    | quadratic easing : t^2                                      | yes  | yes  | yes    |
 * |  quartic  | quartic easing : t^4                                        | yes  | yes  |  yes   |
 * |  quintic  | quintic easing : t^5                                        | yes  | yes  |  yes   |
 * |  regular  | regular easing                                              | yes  | yes  |  yes   |
 * |   sine    | sinusoidal easing : sin(t)                                  | yes  | yes  |  yes   |
 * @summary The {@link core.easings} library contains all the easing functions to create the specific tweening effects.
 * @license {@link https://www.mozilla.org/en-US/MPL/2.0/|MPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/gpl-2.0.fr.html|GPL 2.0} / {@link https://www.gnu.org/licenses/old-licenses/lgpl-2.1.fr.html|LGPL 2.1}
 * @namespace core.easings
 * @memberof core
 * @tutorial system.transitions
 * @see {@link system.transitions|system.transition library}
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