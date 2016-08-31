"use strict" ;

/**
 * Takes a value within a given range and converts it to a number between 0 and 1.
 * Actually it can be outside that range if the original value is outside its range.
 * <pre>
 * trace( core.maths.normalize( 10, 0 , 100 ) ) ; // 0.1
 * </pre>
 * @param value The number value to normalize.
 * @param minimum The minimum value of the normalization.
 * @param maximum The maximum value of the normalization.
 */
export var normalize = ( value , minimum , maximum ) => (value - minimum) / (maximum - minimum) ;
