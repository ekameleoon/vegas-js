"use strict" ;

/**
 * Splice one array into another.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * inserted  = [1, 2, 3, 4] ;
 * container = [5, 6, 7, 8] ;
 *
 * trace( "inserted  : " + inserted  ) ;
 * trace( "container : " + container ) ;
 *
 * trace("---") ;
 *
 * inserted  = [1, 2, 3, 4] ;
 * container = [5, 6, 7, 8] ;
 *
 * spliceInto( inserted, container ) ;
 *
 * trace( "spliceInto( inserted, container, 0 , 0 ) : " + container ) ; // 1,2,3,4,5,6,7,8
 *
 * trace("---") ;
 *
 * inserted  = [1, 2, 3, 4] ;
 * container = [5, 6, 7, 8] ;
 *
 * spliceInto( inserted, container, 0 , 4 ) ;
 *
 * trace( "spliceInto( inserted, container, 0 , 4 ) : " + container ) ; // 1,2,3,4
 *
 * trace("---") ;
 *
 * inserted  = [1, 2, 3, 4] ;
 * container = [5, 6, 7, 8] ;
 *
 * spliceInto( inserted, container, 0 , 2 ) ;
 *
 * trace( "spliceInto( inserted, container, 0 , 2 ) : " + container ) ; // 1,2,3,4,7,8
 * </pre>
 * @param inserted The Array of values inserted in the Array container.
 * @param container The container modified in place.
 * @param position The position in the container to inserted the Array of chars.
 * @param count The count value to replaced values.
 */
export function spliceInto( inserted /*Array*/ , container /*Array*/ , position /*Number*/ , count /*Number*/ )
{
    inserted.unshift( position , count ) ;
    try
    {
        container.splice.apply( container , inserted ) ;
    }
    finally
    {
        inserted.splice(0, 2) ;
    }
}