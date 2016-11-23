"use strict" ;

import { bounceIn  } from './bounceIn.js' ;
import { bounceOut } from './bounceOut.js' ;

/**
 * The <code>bounceInOut</code> function combines the motion of the <code>bounceIn</code> and <code>bounceOut</code> functions
 * @name bounceInOut
 * @function bounceInOut
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var bounceInOut = ( t , b , c , d ) =>
{
    return (t < d/2) ? bounceIn(t * 2, 0, c, d) * 0.5 + b : bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b ;
}
