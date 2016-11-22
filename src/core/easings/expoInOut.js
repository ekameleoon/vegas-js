"use strict" ;

/**
 * The <code>expoInOut</code> function combines the motion of the expoIn and expoOut() methods to start the motion from a zero velocity, accelerate motion, then decelerate to a zero velocity.
 * The exponential functions is based on the number 2 raised to a multiple of <b>10</b> : <code>p(t) = 2^10(t-1)</code>
 * @name expoInOut
 * @function expoInOut
 * @memberof core.easings
 * @instance
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var expoInOut = ( t , b , c , d ) =>
{
    if ( t === 0 )
    {
        return b ;
    }
    if ( t === d )
    {
        return b + c ;
    }
    if ( (t /= d/2 ) < 1 )
    {
        return c/2 * Math.pow(2, 10 * (t - 1)) + b ;
    }
    return c/2 * (-Math.pow(2, -10 * --t) + 2) + b ;
}
