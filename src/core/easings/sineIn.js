"use strict" ;

/**
 * The <code>sineIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * <p>A sinusoidal equation is based on a sine or cosine function. Either one produces a sine wave—a periodic oscillation of a specific shape.</p>
 * <p>This is the equation on which I based the easing curve : <code>p(t) = sin( t &#42; Math.PI / 2 )</code></p>
 * @name sineIn
 * @function
 * @instance
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var sineIn = ( t , b , c , d ) => -c * Math.cos( t / d * ( Math.PI / 2 ) ) + c + b ;
