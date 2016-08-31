"use strict" ;

/**
 * Reports the index position of the last occurrence in this instance of one or more characters specified in a Unicode array.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( lastIndexOfAny("hello world", ["2", "hello", "5"]) ); // 0
 * trace( lastIndexOfAny("Five 5 = 5 and not 2" , ["2", "hello", "5"]) ); // 19
 * trace( lastIndexOfAny("Five 5 = 5 and not 2" , ["5", "hello", "2"]) ); // 9
 * trace( lastIndexOfAny("Five 5 = 5 and not 2" , ["5", "hello", "2"] , 8) ); // 5
 * trace( lastIndexOfAny("Five 5 = 5 and not 2" , ["5", "hello", "2"] , 8 , 3) ); // -1
 * </pre>
 * @param source The string to transform.
 * @param anyOf The Array of Unicode characters to find in the String.
 * @param startIndex The init position of the search process.
 * @param count The number of elements to check.
 * @return the index position of the last occurrence in this instance of one or more characters specified in a Unicode array.
 */
export function lastIndexOfAny( source /*String*/ , anyOf /*Array*/ , startIndex /*uint*/ , count /*int*/ ) /*int*/
{
    var i /*int*/ ;
    var index /*int*/ ;

    startIndex = isNaN( startIndex ) ? 0x7FFFFFFF : startIndex ;
    count      = isNaN( count )      ? 0x7FFFFFFF : count ;

    if( anyOf === null || source === null || source.length === 0 )
    {
        return - 1;
    }

    if ( startIndex > source.length )
    {
        startIndex = source.length ;
    }
    else if( startIndex < 0 )
    {
        return - 1 ;
    }

    var endIndex /*int*/ = startIndex - count + 1 ;
    if ( endIndex < 0 )
    {
        endIndex = 0 ;
    }
    source = source.slice( endIndex, startIndex + 1 ) ;
    var len /*uint*/ = anyOf.length ;
    for ( i = 0 ; i < len ; i++ )
    {
        index = source.lastIndexOf( anyOf[i], startIndex ) ;
        if (index > - 1)
        {
            return index + endIndex;
        }
    }

    return - 1 ;
}