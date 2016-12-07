"use strict" ;

import { isUnique } from './isUnique.js' ;

/**
 * Returns a set of unique colors up to a given maximum.
 * @name uniques
 * @memberof core.colors
 * @function
 * @instance
 * @param {Array} colors - The vector of uint colors to evaluates.
 * @param {number} maximum - The maximum length of the result set of color elements.
 * @param {number} [tolerance=0.01] - The tolerance of the algorythm.
 * @return {Array} A set of unique colors up to a given maximum.
 * @example
 * var colors = [0xFFFFFF,0xFFFFFE,0xFF0000,0xFFFFFF,0x000000,0xFF0000,0xFFFFFD] ;
 *
 * trace( colors ) ; // 16777215,16777214,16711680,16777215,0,16711680,16777213
 *
 * colors = uniques( colors ) ;
 *
 * trace( colors ) ; // 16777215,16711680,0
 */
export var uniques = ( colors , maximum = 0xFFFFFF , tolerance = 0.01 ) =>
{
    var result = [] ;

    for ( let i = 0 ; i < colors.length && result.length < maximum ; i++ )
    {
        if ( isUnique( colors[i], result, tolerance ) )
        {
            result.push( colors[i] ) ;
        }
    }

    return result;
}