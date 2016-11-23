"use strict" ;

/**
 * Splices an array (removes an element) and returns either the entire array or the removed element.
 * @memberof core.arrays
 * @name pierce
 * @function
 * @param {Array} ar - The array to pierce.
 * @param {number} index - The index of the array element to remove from the array (default 0).
 * @param {boolean} flag - A boolean <code>true</code> to return a new spliced array of false to return the removed element.
 * @return The newly spliced array or the removed element in function of the flag parameter.
 * @example
 * var ar = [0,1,2,3,4,5] ;
 *
 * trace( ar ) ; // 0,1,2,3,4,5
 *
 * trace( "pierce( ar, 1 ) : " + pierce( ar, 1 ) ) ; // pierce(ar,1) : 1
 * trace( "pierce( ar, 1 ) : " + pierce( ar, 1 ) ) ; // pierce(ar,1) : 2
 *
 * trace( ar ) ; // 0,3,4,5
 *
 * trace( pierce( ar, 1 , true ) ) ; // 0,4,5
 */
export function pierce( ar /*Array*/ , index /*uint*/ , flag /*Boolean*/ )
{
    index = index > 0 ? Math.abs(index) : 0 ;
    flag  = Boolean( flag ) ;
    var item = ar[index] ;
    ar.splice( index , 1 ) ;
    return flag ? ar : item ;
}