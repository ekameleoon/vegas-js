"use strict" ;

/**
 * The <code>regularInOut</code> function combines the motion of the regularIn() and regularOut() methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * @name regularInOut
 * @function
 * @instance
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var regularInOut = ( t , b , c , d ) =>
{
    if ( (t/=d/2) < 1 )
    {
        return c/2 * t * t + b ;
    }
    return -c/2 * ( (--t) * ( t-2 ) - 1 ) + b ;
}
