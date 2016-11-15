"use strict" ;

/**
 * The <code>quinticInOut</code> function combines the motion of the quinticIn() and quinticOut() methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * A quintic easing continues the upward trend, raises time to the fifth power : <code>p(t) = t &#42; t &#42; t &#42; t &#42; t</code>
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var quinticInOut = ( t , b , c , d ) =>
{
    if ((t/=d/2) < 1)
    {
        return c/2 * t * t * t * t * t + b ;
    }
    return c/2 * ( (t-=2) * t * t * t * t + 2 ) + b ;
};
