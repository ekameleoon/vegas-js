"use strict" ;

/**
 * The <code>quarticInOut</code> function combines the motion of the quarticIn and quarticOut methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * A quartic equation is based on the power of four : <code>p(t) = t &#42; t &#42; t &#42; t</code>
 * @name quarticInOut
 * @function
 * @instance
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var quarticInOut = ( t , b , c , d ) =>
{
    if ((t/=d/2) < 1)
    {
        return c/2 * t * t * t * t + b ;
    }
    return -c/2 * ( (t-=2) * t * t * t - 2 ) + b ;
}
