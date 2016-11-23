"use strict" ;

import { interpolate } from './interpolate.js' ;
import { normalize }   from './normalize.js' ;

/**
 * Takes a value in a given range (minimum1, maximum1) and finds the corresponding value in the next range(minimum2, maximum2).
 * @name map
 * @memberof core.maths
 * @function
 * @param {number} value - The number value to map.
 * @param {number} min1 - The minimum value of the first range of the value.
 * @param {number} max1 - The maximum value of the first range of the value.
 * @param {number} min2 - The minimum value of the second range of the value.
 * @param {number} max2 - The maximum value of the second range of the value.
 * @return value in a given range (minimum1, maximum1) and finds the corresponding value in the next range(minimum2, maximum2).
 * @example
 * trace( map( 10,  0, 100, 20, 80  ) ) ; // 26
 * trace( map( 26, 20,  80,  0, 100 ) ) ; // 10
 */
export var map = ( value , min1 , max1 , min2 , max2 ) => interpolate( normalize( value, min1, max1 ), min2, max2 );
