"use strict" ;

/**
 * Returns a new Array who contains the specified Array elements repeated count times.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( core.arrays.repeat( [2, 3, 4] , 0 ) ) ; // 2,3,4
 * trace( core.arrays.repeat( [2, 3, 4] , 3 ) ) ; // 2,3,4,2,3,4,2,3,4
 * </pre>
 * @return a new Array who contains the specified Array elements repeated count times.
 */
export function repeat( ar /*Array*/ , count /*uint*/ ) /*Array*/
{
    count = isNaN(count) ? 0 : count ;
    count = count > 0 ? Math.abs(count) : 0 ;
    var result /*Array*/ ;
    if ( count > 0 )
    {
        result = [] ;
        for( var i /*int*/ = 0 ; i < count ; i++ )
        {
            result = result.concat(ar) ;
        }
    }
    else
    {
        result = [].concat(ar) ;
    }
    return result ;
}