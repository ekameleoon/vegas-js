"use strict" ;

/**
 * The <code>sineInOut</code> function combines the motion of the sineIn() and sineOut() methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * <p>A sinusoidal equation is based on a sine or cosine function. Either one produces a sine wave—a periodic oscillation of a specific shape.</p>
 * <p>This is the equation on which I based the easing curve : <code>p(t) = sin( t &#42; Math.PI / 2 )</code></p>
 * @name sineInOut
 * @function
 * @instance
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var sineInOut = ( t , b , c , d ) => -c/2 * ( Math.cos( Math.PI*t/d ) - 1 ) + b ;
