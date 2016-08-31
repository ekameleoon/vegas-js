/*jslint noempty: false */
"use strict" ;

import { whiteSpaceChars } from './whiteSpaceChars.js' ;

/**
 * Removes all occurrences of a set of characters specified in an array from the beginning of this instance.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( trimStart("---hello world---" , Strings.whiteSpaceChars.concat("-") ) ); // hello world---
 * </pre>
 * @param source The string to trim.
 * @param chars The optional Array of characters to trim. If this argument is null the <code class="prettyprint">core.strings.whiteSpaceChars</code> array is used.
 * @return The new trimed string.
 */
export function trimStart( source /*String*/ , chars /*Array*/ ) /*String*/
{
    if( !chars || !(chars instanceof Array) )
    {
        chars = whiteSpaceChars ;
    }

    if ( source === null || source === "" )
    {
        return "" ;
    }

    var i /*int*/ ;
    var l /*int*/ = source.length ;

    for( i = 0; (i < l) && (chars.indexOf( source.charAt( i ) ) > - 1) ; i++ )
    {
    }

    return source.substring( i );
}