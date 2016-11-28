"use strict" ;

/**
 * This method will interpolate while easing in and out at the limits.
 * @name hermite
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} start the begining value.
 * @param {number} end The ending value.
 * @param {number} amount The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( hermite( 0 , 100 , 0.5 ) ; // 50
 */
export var hermite = ( start , end , amount ) =>
{
    if ( start === end )
    {
        return start ;
    }
    amount = amount * amount * ( 3 - 2 * amount ) ; // lerp(3-2*amount)
    return ( ( 1 - amount ) * start ) + ( amount * end ) ;
}
