"use strict" ;

/**
 * Quick and fast format of a string using indexed parameters only.
 * <p>Usage :</p>
 * <ul>
 * <li><code>fastformat( pattern:String, ...args:Array ):String</code></li>
 * <li><code>fastformat( pattern:String, [arg0:*,arg1:*,arg2:*, ...] ):String</code></li>
 * </ul>
 * @example
 * <code class="prettyprint">
 * trace( fastformat( "hello {0}", "world" ) );
 * //output: "hello world"
 *
 * trace( fastformat( "hello {0} {1} {2}", [ "the", "big", "world" ] ) );
 * //output: "hello the big world"
 * </code>
 * @see: format
 */
export function fastformat( pattern /*String*/ ) /*String*/
{
    if( (pattern === null) || (pattern === "") )
    {
        return "";
    }

    Object.setPrototypeOf( arguments , Array.prototype ) ;

    var args = arguments ;

    args.shift() ;

    var len /*int*/ = args.length;

    if( (len === 1) && (args[0] instanceof Array) )
    {
        args = args[0] ;
        len  = args.length;
    }

    for( var i = 0 ; i < len ; i++ )
    {
        pattern = pattern.replace( new RegExp( "\\{"+i+"\\}", "g" ), args[i] );
    }

    return pattern;
}