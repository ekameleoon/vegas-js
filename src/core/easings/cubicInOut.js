"use strict" ;

/**
 * The <code>cubicOut</code> function combines the motion of the <b>cubicIn</b> and <b>cubicOut</b> functions to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * <p>A cubic equation is based on the power of three : <code>p(t) = t &#42; t &#42; t</code>.</p>
 * @name cubicInOut
 * @function
 * @instance
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var cubicInOut = ( t , b , c , d ) =>
{
    if ((t/=d/2) < 1)
    {
        return c/2 * t* t* t + b ;
    }
    return c/2 * ( (t-=2) * t * t + 2 ) + b ;
}
