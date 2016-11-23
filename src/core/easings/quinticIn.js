"use strict" ;

/**
 * The <code>quinticIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * A quintic easing continues the upward trend, raises time to the fifth power : <code>p(t) = t &#42; t &#42; t &#42; t &#42; t</code>
 * @name quintic
 * @function quintic
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var quinticIn = ( t , b , c , d ) => c * (t/=d) * t * t * t * t + b ;
