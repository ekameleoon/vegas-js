"use strict" ;

import { bounceOut } from './bounceOut.js' ;

/**
 * The <code>bounceIn</code> function starts the bounce motion slowly and then accelerates motion as it executes.
 * @name bounceIn
 * @function bounceIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var bounceIn = ( t , b , c , d ) =>
{
    return c - bounceOut( d - t , 0 , c , d ) + b ;
}
