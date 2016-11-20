"use strict" ;

/**
 * Compares two strings.
 * <p>
 * The default comparaison algorithm use an ascending alphabetic order
 * with minuscule weighting less than majuscule.
 * </p>
 *
 * @example basic usage
 * <code>
 * var s0:String = "HELLO";
 * var s1:String = "hello";
 * var s2:String = "welcome";
 * var s3:String = "world";
 *
 * trace( compare( s1, s2 ) ); //-1
 * trace( compare( s2, s1 ) ); //1
 * trace( compare( s1, s3 ) ); //1
 * trace( compare( s1, s1 ) ); //0
 * trace( compare( s1, s0 ) ); //0
 * trace( compare( s1, s0, true ) ); //-1
 * trace( compare( s0, s1, true ) ); //1
 * </code>
 * @param str1 first string to compare with the second string
 * @param str2 second string to compare with the first string
 * @param strict (optional) take into account the string case, default to false
 * @return <p>
 * <ul>
 * <li> 0 if the two strings are considered equals</li>
 * <li>-1 if the first string is considered smaller (lower) than the second string</li>
 * <li> 1 if the first string is considered bigger (higher) than the second string</li>
 * </ul>
 * </p>
 */
export function compare( str1 /*String*/ , str2 /*String*/ , strict = false ) /*int*/
{
    if( !( (typeof(str1) === 'string') || (str1 instanceof String ) ) )
    {
        throw new TypeError('Bad arguments, the compare function failed, the first argument must be a string value.') ;
    }

    if( !( (typeof(str2) === 'string') || (str2 instanceof String ) ) )
    {
        throw new TypeError('Bad arguments, the compare function failed, the second argument must be a string value.') ;
    }

    if( str1 === str2 )
    {
        return 0;
    }

    strict = Boolean(strict) ;

    if( !strict )
    {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
    }

    if( str1.length === str2.length )
    {
        var local /*int*/ = str1.localeCompare( str2 );
        if( local === 0 )
        {
            return 0;
        }
        else if( local < 0 )
        {
            return -1;
        }

        return 1;
    }
    else if( str1.length > str2.length )
    {
        return 1;
    }
    else
    {
        return -1;
    }
}