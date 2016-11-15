"use strict" ;

/**
 * The <code>backIn</code> function starts the motion by moving towards the target, overshooting it slightly,
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @param s Specifies the amount of overshoot, where the higher the value, the greater the overshoot.
 * @return The value of the interpolated property at the specified time.
 */
export var backOut = ( t , b , c , d , s = 1.70158 ) =>
{
    if ( isNaN( s ) )
    {
        s = 1.70158 ;
    }
    return c * ((t=t/d-1) * t * ((s+1) * t + s) + 1) + b;
}