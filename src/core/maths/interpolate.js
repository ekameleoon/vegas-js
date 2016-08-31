"use strict" ;

/**
 * With a number value and a range this method returns the actual value for the interpolated value in that range.
 * <pre class="prettyprint">
 * trace( core.maths.interpolate( 0.5, 0 , 100 ) ) ; // 50
 * </pre>
 * @param value The normal number value to interpolate (value between 0 and 1).
 * @param minimum The minimum value of the interpolation.
 * @param maximum The maximum value of the interpolation.
 * @return the actual value for the interpolated value in that range.
 */
export var interpolate = ( value , minimum , maximum ) => minimum + (maximum - minimum) * value ;
