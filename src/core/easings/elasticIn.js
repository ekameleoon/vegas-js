"use strict" ;

/**
 * The <code>elasticIn</code> function starts motion from zero velocity and then accelerates motion as it executes.
 * @name elasticIn
 * @function elasticIn
 * @memberof core.easings
 * @instance
 * @param {number} t - Specifies the current time, between 0 and duration inclusive.
 * @param {number} b - Specifies the initial value of the animation property.
 * @param {number} c - Specifies the total change in the animation property.
 * @param {number} d - Specifies the duration of the motion.
 * @param {number} [a=0] - Specifies the amplitude of the sine wave.
 * @param {number} [p=0] - Specifies the period of the sine wave.
 * @return The value of the interpolated property at the specified time.
 */
export var elasticIn = ( t , b , c , d , a = 0 , p = 0 ) =>
{
    var s ;

    if ( t === 0 )
    {
        return b ;
    }

    if ((t/=d) === 1)
    {
        return b+c ;
    }

    if ( !(p) )
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
        s = p / ( 2 * Math.PI ) * Math.asin ( c/a ) ;
    }

    return -( a * Math.pow( 2 , 10 * ( t-=1 ) ) * Math.sin( ( t * d - s ) * ( 2 * Math.PI ) / p )) + b ;
}
