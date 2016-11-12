"use strict" ;

/**
 * The <code>circularIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var circularIn = ( t , b , c , d ) =>
{
    return -c * ( Math.sqrt(1 - ( t/=d ) * t ) - 1) + b ;
}
