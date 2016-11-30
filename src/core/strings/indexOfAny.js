"use strict" ;

/**
 * Reports the index of the first occurrence in a string expression of any character in a specified array of Unicode characters.
 * @name indexOfAny
 * @memberof core.strings
 * @function
 * @instance
 * @param {string} source - The string reference to check.
 * @param {Array} anyOf - The Array of Unicode characters to find in the String.
 * @param {number} [startIndex=0] - The init position of the search process.
 * @param {number} [count=-1] - The number of character positions to examine.
 * @return the index of the first occurrence in this instance of any character in a specified array of Unicode characters.
 * @example
 * trace( indexOfAny( "hello world" , ["h","e","l"]) ) ; // 0
 * trace( indexOfAny( "hello world" , ["w","a","i","t"]) ) ; // 6
 * trace( indexOfAny( "hello world" , ["n","i"] ) ) ; // -1
 */
export function indexOfAny( source , anyOf , startIndex = 0 , count = -1 ) 
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return -1 ;
    }

    if( !(anyOf instanceof Array) )
    {
        return -1 ;
    }

    startIndex = startIndex > 0 ? 0 : startIndex ;
    count      = count < 0 ? -1 : count ;

    let l = source.length ;
    let endIndex ;

    if( ( count < 0 ) || ( count > l - startIndex ) )
    {
        endIndex = l - 1 ;
    }
    else
    {
        endIndex = startIndex + count - 1;
    }

    for( let i = startIndex ; i <= endIndex ; i++ )
    {
        if( anyOf.indexOf( source[i] ) > - 1 )
        {
            return i ;
        }
    }

    return -1 ;
}