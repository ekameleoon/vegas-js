"use strict" ;

/**
 * Reports the index of the first occurrence in this instance of any character in a specified array of Unicode characters.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * result = indexOfAny("hello world", [2, "hello", 5]) ;
 * trace( result ) ; // 0
 *
 * result = indexOfAny("Five = 5", [2, "hello", 5]) ;
 * trace( result ) ; // 2
 *
 * result = indexOfAny("actionscript is good", [2, "hello", 5]) ;
 * trace( result ) ; // -1
 * </pre>
 * @return the index of the first occurrence in this instance of any character in a specified array of Unicode characters.
 */
export function indexOfAny( source /*String*/ , anyOf /*Array*/ , startIndex /*uint*/ , count /*int*/ ) /*int*/
{
    startIndex = isNaN(startIndex) ? 0 : startIndex ;
    if ( startIndex < 0 )
    {
        startIndex = 0 ;
    }

    count = isNaN(count) ? -1 : ( ( count >= 0 ) ? count : -1 ) ;

    if( anyOf !== null && source !== null && source !== "" )
    {
        var i /*int*/ ;
        var l /*int*/ = anyOf.length ;
        var endIndex /*int*/ ;
        if( ( count < 0 ) || ( count > l - startIndex ) )
        {
            endIndex = l - 1;
        }
        else
        {
            endIndex = startIndex + count - 1;
        }
        for( i = startIndex ; i <= endIndex ; i++ )
        {
            if( source.indexOf( anyOf[i] ) > - 1 )
            {
                return i ;
            }
        }
    }
    return -1 ;
}