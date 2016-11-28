/*jshint bitwise: false*/
"use strict" ;

/**
 * Returns a new String value who contains the specified String characters repeated count times.
 * @name repeat
 * @memberof core.strings
 * @function
 * @instance
 * @param {string} source - The string reference to repeat.
 * @param {number} [count=1] - The number of time to repeat the passed-in expression.
 * @return A new expression who contains the specified String characters repeated count times.
 * @example
 * trace( repeat( "hello" ) ) ; // hello
 * trace( repeat( "hello" , 0 ) ) ; // ""
 * trace( repeat( "hello" , 1 ) ) ; // hello
 * trace( repeat( "hello" , 2 ) ) ; // hellohello
 * trace( repeat( "hello" , 3 ) ) ; // hellohellohello
 *
 * trace( repeat( "hello" , -1 ) ) ; // throws RangeError =>'repeat count must be non-negative'
 * trace( repeat( "hello" , Infinity ) ) ; // throws RangeError =>'repeat count must be less than infinity'
 */
export function repeat( source , count = 1 )
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

    count = Math.floor(count);

    // Ensuring count is a 31-bit integer allows us to heavily optimize the main part.
    // But anyway, most current (August 2014) browsers can't handlestrings 1 << 28 chars or longer, so:
    if ( (source.length * count) >= (1 << 28))
    {
        throw new RangeError('repeat count must not overflow maximum string size');
    }

    if ( count === 0 )
    {
        return "" ;
    }

    var result = '';
    for (;;)
    {
        if ((count & 1) === 1)
        {
            result += source;
        }
        count >>>= 1;
        if (count === 0)
        {
            break;
        }
        source += source;
    }
    return result;
}