"use strict" ;

/**
 * With a number value and a range this method returns the actual value for the interpolated value in that range.
 * @name interpolate
 * @memberof core.maths
 * @function
 * @param {number} value The normal number value to interpolate (value between min and max).
 * @param {number} min The minimum value of the interpolation.
 * @param {number} max The maximum value of the interpolation.
 * @return the actual value for the interpolated value in that range.
 * @example
 * trace( interpolate( 0.5 , 0 , 100 ) ) ; // 50
 */
export var interpolate = ( value , min , max ) => min + (max - min) * value ;
