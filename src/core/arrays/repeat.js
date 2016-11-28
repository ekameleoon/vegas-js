"use strict" ;

/**
 * Returns a new Array who contains the specified Array elements repeated count times.
 * @name repeat
 * @memberof core.arrays
 * @function
 * @instance
 * @param {Array} ar - The array to repeat.
 * @param {number} count - The number of repeat.
 * @return {Array} A new Array who contains the specified Array elements repeated count times.
 * @example
 * trace( repeat( [2, 3, 4] , 0 ) ) ; // 2,3,4
 * trace( repeat( [2, 3, 4] , 3 ) ) ; // 2,3,4,2,3,4,2,3,4
 */
export function repeat( ar /*Array*/ , count /*uint*/ ) /*Array*/
{
    var result = null ;
    if( ar instanceof Array )
    {
        count = count > 0 ? count : 0 ;
        if ( count > 0 )
        {
            result = [] ;
            for( var i = 0 ; i < count ; i++ )
            {
                result = result.concat(ar) ;
            }
        }
        else
        {
            result = [].concat(ar) ;
        }
    }
    return result ;
}