"use strict" ;

/**
 * The <code>cubicIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * @name cubicIn
 * @function cubicIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var cubicIn = ( t , b , c , d ) => c * (t/=d) * t * t + b ;
