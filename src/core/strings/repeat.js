"use strict" ;

/**
 * Returns a new String value who contains the specified String characters repeated count times.
 * @param source The string expression to repeat.
 * @param count The number of time to repeat the passed-in expression.
 * @example
 * <pre>
 * trace( repeat( "hello" , 0 ) ) ; // hello
 * trace( repeat( "hello" , 3 ) ) ; // hellohellohello
 * </pre>
 * @return a new String who contains the specified String characters repeated count times.
 */
export function repeat( source /*String*/ , count /*uint*/ = 1 ) /*String*/
{
    if( !(source instanceof String || typeof(source) === 'string' ) || source === "" )
    {
        return '' ;
    }

    count = isNaN( count ) ? 0 : count ;

    if (count < 0)
    {
        throw new RangeError('repeat count must be non-negative');
    }

    if (count === Infinity)
    {
        throw new RangeError('repeat count must be less than infinity');
    }

    var result = "" ;
    if ( count > 0 )
    {
        for( var i = 0  ; i < count ; i++ )
        {
            result = result.concat( source ) ;
        }
    }

    return result ;
}