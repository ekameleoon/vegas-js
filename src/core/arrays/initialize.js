"use strict" ;

/**
 * Initializes a new Array with an arbitrary number of elements (index), with every element containing the passed parameter value or by default the null value.
 * @name initialize
 * @memberof core.arrays
 * @instance
 * @function
 * @param {number} [elements=1] - The number of elements to fill the Array.
 * @param {*} [value=null] - The value to inject in the Array.
 * @return A new Array with an arbitrary number of elements (index), with every element containing the passed parameter value or by default the null value.
 * @example
 * ar = initialize( 3 ) ;
 * trace( ar ) ; // [ null , null , null ]
 *
 * ar = initialize( 3 , 0 ) ;
 * trace( ar ) ; // [ 0 , 0 , 0 ]
 *
 * ar = initialize( 3 , true ) ;
 * trace( ar ) ; // [ true , true , true ]
 *
 * ar = initialize(  4 , "" ) ;
 * trace( ar ) ; // [ "" ,"" ,"" ,"" ]
 */
export function initialize( elements = 1 , value = null ) /*Array*/
{
    var ar = [];

    elements = elements > 0 ? Math.abs(elements) : 0 ;

    for( var i /*int*/ = 0 ; i < elements ; i++ )
    {
        ar[i] = value ;
    }

    return ar;
}