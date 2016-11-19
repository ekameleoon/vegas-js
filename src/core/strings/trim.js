/*jslint noempty: false */
"use strict" ;

import { whiteSpaces } from './whiteSpaces.js' ;

/**
 * Removes all occurrences of a set of specified characters (or strings) from the beginning and end of this instance.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( trim("\r\t   hello world   \t ") ); // hello world
 * </pre>
 * @param source The string to trim.
 * @param chars The optional Array of characters to trim. If this argument is null the <code class="prettyprint">core.strings.whiteSpaces</code> array is used.
 * @return The new trimed string.
 */
export function trim( source /*String*/ , chars /*Array*/ ) /*String*/
{
    if( !chars || !(chars instanceof Array) )
    {
        chars = whiteSpaces ;
    }

    if ( source === null || source === "" )
    {
        return "" ;
    }

    var i /*int*/ ;
    var l /*int*/ ;

    ////// start

    l = source.length ;

    for( i = 0 ; (i < l) && (chars.indexOf( source.charAt( i ) ) > - 1) ; i++ )
    {
        //
    }

    source = source.substring( i );

    ////// end

    l = source.length ;
    for( i = source.length - 1; (i >= 0) && (chars.indexOf( source.charAt( i ) ) > - 1) ; i-- )
    {
    }
    source = source.substring( 0, i + 1 ) ;

    //////

    return source ;
}