"use strict" ;

/**
 * The <code>quarticIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * A quartic equation is based on the power of four : <code>p(t) = t &#42; t &#42; t &#42; t</code>
 * @name quarticIn
 * @function
 * @instance
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var quarticIn = ( t , b , c , d ) => c * (t/=d) * t * t * t + b ;
