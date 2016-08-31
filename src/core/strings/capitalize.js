"use strict" ;

/**
 * Converts the first letter of each word in a string to uppercase.
 * @param source The string to transform.
 * @example
 * <code class="prettyprint">
 * trace( capitalize( "hello world" ) ) ; // Hello World
 * </code>
 * @return The capitalized string.
 */
export function capitalize( source /*String*/ ) /*String*/
{
    return source.replace
    (
        /\b[a-z]/g,
        function( match )
        {
            return match.toUpperCase();
        }
    );
}
