"use strict" ;

/**
 * Short for 'cosinusoidal interpolation', this method will interpolate while easing around the end, when value is near one.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.coserp( 0 , 100 , 0.5 ) ;
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */
export var coserp = ( amount , start , end ) =>
{
    if ( start === end )
    {
        return start ;
    }
    amount = 1 - Math.cos( amount * Math.PI * 0.5 ) ;
    return ( ( 1 - amount ) * start ) + ( amount * end ) ;
}
