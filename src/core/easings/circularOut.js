"use strict" ;

/**
 * The <code>circularOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var circularOut = ( t , b , c , d ) => c * Math.sqrt( 1 - ( t = t/d-1) * t ) + b ;
