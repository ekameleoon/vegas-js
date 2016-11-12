"use strict" ;

/**
 * The <code>expoIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * The exponential functions is based on the number 2 raised to a multiple of <b>10</b> : <code>p(t) = 2^10(t-1)</code>
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var expoIn = ( t , b , c , d ) => ( t === 0 ) ? b : c * Math.pow( 2 , 10 * (t/d - 1) ) + b ;
