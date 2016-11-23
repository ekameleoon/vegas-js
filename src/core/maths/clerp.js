"use strict" ;

/**
 * Circular Lerp is like lerp but handles the wraparound from 0 to 360.
 * This is useful when interpolating eulerAngles and the object crosses the 0/360 boundary.
 * The standard Lerp function causes the object to rotate in the wrong direction and looks stupid, clerp() fixes that.
 * @name clerp
 * @memberof core.maths
 * @function
 * @param {number} start - The begining value.
 * @param {number} end - The ending value.
 * @param {number} amount - The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( clerp( 0 , 180 , 0.5 ) ; // 90
 */
export var clerp = ( start , end , amount ) =>
{
    let max  = 360 ;
    let half = 180 ; // abs((360-0)/2) == abs(max-min)/2
    let diff = end - start ;
    if ( diff < -half )
    {
        return start + ( ( max - start ) + end ) * amount ;
    }
    else if ( diff > half )
    {
        return start - ( ( max - end ) + start ) * amount ;
    }
    else
    {
        return start + ( end - start ) * amount ;
    }
}
