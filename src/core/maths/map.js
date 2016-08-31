"use strict" ;

import { interpolate } from './interpolate.js' ;
import { normalize }   from './normalize.js' ;

/**
 * Takes a value in a given range (minimum1, maximum1) and finds the corresponding value in the next range(minimum2, maximum2).
 * <pre class="prettyprint">
 * trace( core.maths.map( 10,  0, 100, 20, 80  ) ) ; // 26
 * trace( core.maths.map( 26, 20,  80,  0, 100 ) ) ; // 10
 * </pre>
 * @param value The number value to map.
 * @param minimum1 The minimum value of the first range of the value.
 * @param maximum1 The maximum value of the first range of the value.
 * @param minimum2 The minimum value of the second range of the value.
 * @param maximum2 The maximum value of the second range of the value.
 * @return value in a given range (minimum1, maximum1) and finds the corresponding value in the next range(minimum2, maximum2).
 */
export var map = ( value , minimum1 , maximum1 , minimum2 , maximum2 ) => interpolate( normalize( value, minimum1, maximum1 ), minimum2, maximum2 );
