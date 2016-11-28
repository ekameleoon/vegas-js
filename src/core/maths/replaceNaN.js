"use strict" ;

/**
 * Replace the passed-in Number value, if the value is NaN the return value is the default value in second argument.
 * @name replaceNaN
 * @memberof core.maths
 * @function
 * @param {number} value - The <code>Number</code> value to replace, if this value is <code>NaN</code> the value is changed.
 * @param {*} [defaultValue=0] The default value to apply over the specified value if this value is <code>NaN</code>.
 * @return The replaced value.
 * @example
 * trace( replaceNaN(1,2) ) ; // 1
 * trace( replaceNaN(NaN) ) ; // 0
 * trace( replaceNaN(NaN,2) ) ; // 2
 * trace( replaceNaN(NaN,"foo") ) ; // "foo"
 */
export var replaceNaN = ( value , defaultValue = 0 ) =>
{
    return isNaN( value ) ? defaultValue : value ;
}
