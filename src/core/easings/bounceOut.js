"use strict" ;

/**
 * The <code>bounceOut</code> function starts the bounce motion fast and then decelerates motion as it executes.
 * @name bounceOut
 * @function
 * @instance
 * @memberof core.easings
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @return The value of the interpolated property at the specified time.
 */
export var bounceOut = ( t , b , c , d ) =>
{
    if ((t /= d) < (1 / 2.75))
    {
        return c * (7.5625 * t * t) + b;
    }
    else if (t < (2 / 2.75))
    {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b ;
    }
    else if (t < (2.5 / 2.75))
    {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b ;
    }
    else
    {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b ;
    }
}
