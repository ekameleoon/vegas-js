"use strict" ;

/**
 * This method will interpolate while easing in and out at the limits.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.hermite( 0 , 100 , 0.5 ) ; // 50
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */
export var hermite = ( amount , start , end ) =>
{
    if ( start === end )
    {
        return start ;
    }
    amount *= amount * ( 3 - 2 * amount ) ;
    return ( ( 1 - amount ) * start ) + ( amount * end ) ;
}
