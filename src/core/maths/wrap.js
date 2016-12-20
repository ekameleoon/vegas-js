"use strict" ;

/**
 * Wrap an angle value between two values.
 * @name wrap
 * @memberof core.maths
 * @function
 * @instance
 * @param {number} angle - The passed angle value.
 * @param {number} [min=0] - The minimum angle value.
 * @param {number} [max=360] - The maximum angle value.
 * @return The wrapped angle value fixed between the <code>min</code> and <code>max</code> values.
 * @example
 * trace( wrap( 0 ) ) ; 0
 * trace( wrap( 360 ) ) ; 0
 * trace( wrap( -1 ) ) ; 359
 *
 * trace( wrap( 0 , 0 , Math.PI ) ) ; // 0
 * trace( wrap( Math.PI , 0 , Math.PI ) ) ; // 0
 * trace( wrap( Math.PI / 2 , 0 , Math.PI ) ) ; // Math.PI / 2
 * trace( wrap( Math.PI - 1 , 0 , Math.PI ) === ( Math.PI - 1 ) ) ; // true
 * trace( wrap( Math.PI + 1 , 0 , Math.PI ) ) ; // 1
 */
export function wrap( angle , min = 0 , max = 360 )
{
    let range = max - min;

    if( range <= 0 )
    {
        return 0 ;
    }

    let result = (angle - min) % range ;

    if( result < 0 )
    {
        result += range;
    }

    return result + min ;
}
