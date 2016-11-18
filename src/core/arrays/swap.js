"use strict" ;

/**
 * Swaps two indexed values in a specific array representation.
 * @example
 * <pre>
 * var ar = [ 1 , 2 , 3 , 4 ] ;
 *
 * trace( ar ) ; // 1,2,3,4
 *
 * core.arrays.swap( ar , 1 , 3 ) ;
 *
 * trace( ar ) ; // 1,4,3,2
 * </pre>
 * @param ar The Array of values to change.
 * @param from The first index position to swap.
 * @param to The second index position to swap.
 * @param clone Returns a swaped clone of the passed-in array.
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