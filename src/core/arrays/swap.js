"use strict" ;

/**
 * Swaps two indexed values in a specific array representation.
 * @name swap
 * @memberof core.arrays
 * @function
 * @param {Array} ar - The Array of values to change.
 * @param {number} [from=0] The first index position to swap.
 * @param {number} [to=0] The second index position to swap.
 * @param {boolean} [clone=false] Returns a swaped clone of the passed-in array.
 * @example
 * var ar = [ 1 , 2 , 3 , 4 ] ;
 * trace( ar ) ; // 1,2,3,4
 * swap( ar , 1 , 3 ) ;
 * trace( ar ) ; // 1,4,3,2
 */
export function swap( ar , from = 0 , to = 0 , clone = false )
{
    if( ar instanceof Array )
    {
        if( clone )
        {
            ar = [].concat(ar) ;
        }
        var value = ar[from] ;
        ar[from] = ar[to] ;
        ar[to]   = value ;
        return ar ;
    }
    return null ;
}