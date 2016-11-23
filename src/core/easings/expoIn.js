"use strict" ;

/**
 * The <code>expoIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * The exponential functions is based on the number 2 raised to a multiple of <b>10</b> : <code>p(t) = 2^10(t-1)</code>
 * @name expoIn
 * @function expoIn
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var expoIn = ( t , b , c , d ) => ( t === 0 ) ? b : c * Math.pow( 2 , 10 * (t/d - 1) ) + b ;
