"use strict" ;

/**
 * Quick and fast format of a string using indexed parameters only.
 * <p><strong>Usage :</strong>
 * <ul>
 * <li><code>fastformat( pattern:String, ...args:Array ):String</code></li>
 * <li><code>fastformat( pattern:String, [arg0:*,arg1:*,arg2:*, ...] ):String</code></li>
 * </ul>
 * </p>
 * @name fastformat
 * @memberof core.strings
 * @function
 * @param {string} pattern - The String pattern expression to format.
 * @param {...string} args - A serie of strings values or of arrays of strings to fill the pattern expression.
 * @return The formatted expression.
 * @see {@link core.strings.format}
 * @example
 * trace( fastformat( "hello {0}", "world" ) ); // "hello world"
 * trace( fastformat( "hello {0} {1} {2}", [ "the", "big", "world" ] ) ); // "hello the big world"
 * trace( fastformat( "hello {0} {1} {2}", [ "the", "big" ] , "world" ) ); // "hello the big world"
 */
export function fastformat( pattern , ...args ) /*String*/
{
    if( (pattern === null) || !(pattern instanceof String || typeof(pattern) === 'string' ) )
    {
        return "" ;
    }

    if( args.length > 0 )
    {
        args = [].concat.apply( [] , args ) ;
        let len  = args.length ;
        for( var i = 0 ; i < len ; i++ )
        {
            pattern = pattern.replace( new RegExp( "\\{" + i + "\\}" , "g" ), args[i] );
        }
    }

    return pattern;
}