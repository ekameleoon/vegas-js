"use strict" ;

/**
 * Calculates a percentage value.
 * @name percentage
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} value - The current value to calculates.
 * @param {number} maximum - The max value.
 * @return a percentage value or NaN.
 * @example
 * trace( percentage( 50 , 100 ) + "%" ) ; // 50%
 * trace( percentage( 68 , 425 ) + "%" ) ; // 16%
  */
export var percentage = ( value , maximum ) =>
{
    let p = (value / maximum) * 100 ;
    return (isNaN( p ) || ! isFinite( p )) ? NaN : p ;
}
