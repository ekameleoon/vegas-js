/*jslint noempty: false */
/*jslint unused: false */
"use strict" ;

import { whiteSpaces } from './whiteSpaces.js' ;

/**
 * Removes all occurrences of a set of characters specified in an array from the end of this instance.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( trimEnd("---hello world---" , Strings.whiteSpaces.concat("-") ) ); // ---hello world
 * </pre>
 * @param source The string to trim.
 * @param chars The optional Array of characters to trim. If this argument is null the <code class="prettyprint">core.strings.whiteSpaces</code> array is used.
 * @return The new trimed string.
 */
export function trimEnd( source /*String*/ , chars /*Array*/ ) /*String*/
{
    if( !(chars instanceof Array) )
    {
        chars = whiteSpaces ;
    }

    if ( source === null || source === "" )
    {
        return "" ;
    }

    var i /*int*/ ;
    var l /*int*/ = source.length ;

    for( i = source.length - 1; (i >= 0) && (chars.indexOf( source.charAt( i ) ) > - 1) ; i-- )
    {
    }

    return source.substring( 0, i + 1 );
}