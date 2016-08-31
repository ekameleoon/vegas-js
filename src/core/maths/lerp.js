"use strict" ;

/**
 * Calculates a number between two numbers at a specific increment.
 * The lerp function is convenient for creating motion along a straight path and for drawing dotted lines.
 * <p>Lerp is an abbreviation for linear interpolation, which can also be used as a verb (Raymond 2003).</p>
 * <p>Linear interpolation is a method of curve fitting using linear polynomials.
 * It is heavily employed in mathematics (particularly numerical analysis), and numerous applications including computer graphics. It is a simple form of interpolation.</p>
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.maths.lerp( 0 , 100 , 0.5 ) ; // 50
 * </pre>
 * @param amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @param start the begining value.
 * @param end The ending value.
 * @return The interpolated value between two numbers at a specific increment.
 */
export var lerp = ( amount , start , end ) =>
{
    if ( start === end )
    {
        return start ;
    }
    return ( ( 1 - amount ) * start ) + ( amount * end ) ;
}
