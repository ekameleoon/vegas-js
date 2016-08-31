"use strict" ;

/**
 * Checks if this string starts with the specified prefix.
 * <p><b>Example :</b></p>
 * <pre class="prettyprint">
 * trace( startsWith( "hello.txt" , "hello" ) ) ; // true
 * </pre>
 * @param source the string reference.
 * @param value the value to find in first in the source.
 * @return true if the value is find in first.
 */
export function startsWith( source /*String*/ , value/*String*/ ) /*Boolean*/
{
    if( (source !== null) && (value === "") )
    {
        return true;
    }

    if( (source === null) || (value === null) || (source === "") || (source.length < value.length) )
    {
        return false;
    }

    if( source.charAt( 0 ) !== value.charAt( 0 ) )
    {
        return false;
    }
    return source.indexOf( value ) === 0 ;
}