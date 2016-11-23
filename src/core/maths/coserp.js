"use strict" ;

/**
 * Short for 'cosinusoidal interpolation', this method will interpolate while easing around the end, when value is near one.
 * @name coserp
 * @memberof core.maths
 * @function
 * @param {number} start - The begining value.
 * @param {number} end - The ending value.
 * @param {number} amount - The amount to interpolate between the two values where 0.0 equal to the first point, 0.1 is very near the first point, 0.5 is half-way in between, etc.
 * @return The interpolated value between two numbers at a specific increment.
 * @example
 * trace( coserp( 0 , 100 , 0.5 ) ; // 29.28932188134524
 */
export var coserp = ( start , end , amount ) =>
{
    if ( start === end )
    {
        return start ;
    }
    amount = 1 - Math.cos( amount * Math.PI * 0.5 ) ;
    return ( ( 1 - amount ) * start ) + ( amount * end ) ;
}
