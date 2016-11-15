"use strict" ;

/**
 * The <code>elasticOut</code> function starts motion fast and then decelerates motion to a zero velocity as it executes.
 * @param t Specifies the current time, between 0 and duration inclusive.
 * @param b Specifies the initial value of the animation property.
 * @param c Specifies the total change in the animation property.
 * @param d Specifies the duration of the motion.
 * @param a Specifies the amplitude of the sine wave.
 * @param p Specifies the period of the sine wave.
 * @return The value of the interpolated property at the specified time.
 */
export var elasticOut = ( t , b , c , d , a = 0 , p = 0 ) =>
{
    var s ;

    if ( t === 0 )
    {
        return b ;
    }

    if ( (t/=d) === 1 )
    {
        return b + c ;
    }

    if ( !p )
    {
        p = d * 0.3 ;
    }
    if ( !a || a < Math.abs(c) )
    {
        a = c   ;
        s = p / 4 ;
    }
    else
    {
        s = p / (2*Math.PI) * Math.asin(c/a) ;
    }

    return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b) ;
}
