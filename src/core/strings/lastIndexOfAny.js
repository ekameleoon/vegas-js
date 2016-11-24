"use strict" ;

/**
 * Reports the index position of the last occurrence in this instance of one or more characters specified in a Unicode array.
 * @name lastIndexOfAny
 * @memberof core.strings
 * @function
 * @param {string} source - The string reference to check.
 * @param {Array} anyOf - The Array of Unicode characters to find in the String.
 * @param {number} [startIndex] - The init position of the search process (by default the length-1 of the source).
 * @param {number} [count=-1] - The number of character positions to check.
 * @return the index position of the last occurrence in this instance of one or more characters specified in a Unicode array.
 * @example
 * trace( lastIndexOfAny( "hello world" , ["n","i"] ) ) ; // -1
 * trace( lastIndexOfAny( "hello world" , ["h","e","l"]) ) ; // 0
 * trace( lastIndexOfAny( "hello world" , ["l","e","h"]) ) ; // 9
 * trace( lastIndexOfAny( "hello world" , ["w","a","i","t"]) ) ; // 6
 * trace( lastIndexOfAny( "hello world" , ["d","r","a","w"]) ) ; // 10
 * trace( lastIndexOfAny( "hello world" , ["l"]) ) ; // 9
 * trace( lastIndexOfAny( "hello world" , ["l"] , 9 ) ) ; // 3
 * trace( lastIndexOfAny( "hello world" , ["w"] , 9 , 5 ) ) ; // 6
 */
export function lastIndexOfAny( source , anyOf , startIndex = Infinity , count = Infinity  ) /*int*/
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return -1 ;
    }

    if( !(anyOf instanceof Array) || anyOf.length === 0 )
    {
        return -1 ;
    }

    if( startIndex < 0 )
    {
        return -1 ;
    }
    else if( isNaN(startIndex) || startIndex > source.length )
    {
        startIndex = source.length ;
    }

    count = count > 0 ? count : 0 ;

    let endIndex = Math.max( startIndex - count , 0 ) ;

    source = source.slice( endIndex, startIndex ) ;

    let len = anyOf.length ;
    for ( let i = 0 ; i < len ; i++ )
    {
        let index = source.lastIndexOf( anyOf[i] , startIndex ) ;
        if (index > - 1)
        {
            return endIndex + index ;
        }
    }

    return - 1 ;
}