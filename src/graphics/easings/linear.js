"use strict" ;

/**
 * The <code>linear</code> function starts a basic and linear motion.
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var linear = ( t , b , c , d ) => ( c * t / d ) + b ;