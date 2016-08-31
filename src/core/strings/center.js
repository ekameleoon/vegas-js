"use strict" ;

/**
 * Returns the center string representation of the specified string value.
 * @param source The string to center.
 * @param size The number of character to center the String expression. (default 0)
 * @param separator The optional separator character use before and after the String to center. (default " ")
 * @return The center of the specified String value.
 * @example
 * <code class="prettyprint">
 * trace( center("hello world", 0) )         ; // hello world
 * trace( center("hello world", 20) )        ; //     hello world
 * trace( center("hello world", 20, "_" ) )  ; // ____hello world_____
 * </code>
 */
export function center( source /*String*/ , size /*uint*/ , separator /*String*/ ) /*String*/
{
    if ( source === null )
    {
        return "" ;
    }

    if ( separator === null )
    {
        separator = " " ;
    }

    var len /*int*/ = source.length;

    if ( len <= size )
    {
        len                   = size - len ;
        var remain /*String*/ = ( len % 2 === 0 ) ? "" : separator;
        var pad /*String*/    = "";
        var count /*int*/     = Math.floor( len / 2 );
        if ( count > 0 )
        {
            for( var i /*int*/ = 0 ; i < count ; i++ )
            {
                pad = pad.concat( separator );
            }
        }
        else
        {
            pad = separator;
        }
        return pad + source + pad + remain ;
    }
    else
    {
        return source ;
    }
}