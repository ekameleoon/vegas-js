"use strict" ;

/**
 * Takes a value within a given range and converts it to a number between 0 and 1.
 * Actually it can be outside that range if the original value is outside its range.
 * @name normalize
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} value The normal number value to interpolate (value between min and max).
 * @param {number} min The minimum value of the interpolation.
 * @param {number} max The maximum value of the interpolation.
 * @return The normalized value between 0 and 1.
 * @example
 * trace( normalize( 10, 0 , 100 ) ) ; // 0.1
 */
export var normalize = ( value , minimum , maximum ) => (value - minimum) / (maximum - minimum) ;
