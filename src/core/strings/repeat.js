"use strict" ;

/**
 * Returns a new String value who contains the specified String characters repeated count times.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( repeat( "hello" , 0 ) ) ; // hello
 * trace( repeat( "hello" , 3 ) ) ; // hellohellohello
 * </pre>
 * @return a new String who contains the specified String characters repeated count times.
 */
export function repeat( source /*String*/ , count /*uint*/ ) /*String*/
{
    if ( source === null )
    {
        return "" ;
    }

    count = isNaN( count ) ? 0 : count ;
    count = count > 0 ? count : 0 ;

    var result /*String*/ = "" ;
    if ( count > 0 )
    {
        for( var i /*int*/ = 0  ; i < count ; i++ )
        {
            result = result.concat( source ) ;
        }
    }
    else
    {
        result = source ;
    }
    return result ;
}