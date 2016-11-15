"use strict" ;

/**
 * The <code>quarticOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * A quartic equation is based on the power of four : <code>p(t) = t &#42; t &#42; t &#42; t</code>
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var quarticOut = ( t , b , c , d ) => -c * ( ( t =t/d - 1) * t * t * t - 1) + b ;
