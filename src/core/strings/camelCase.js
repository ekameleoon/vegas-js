"use strict" ;

/**
 * Converts a hyphenated string to a camelcased string.
 * @param source The string to transform.
 * @example
 * <code class="prettyprint">
 * trace( camelCase("hello-world" ) ) ; // helloWorld
 * </code>
 * @return The camelcased string.
 */
export function camelCase( source /*String*/ ) /*String*/
{
    return source.replace
    (
        /-\D/g ,
        function( match )
        {
            return match.charAt(1).toUpperCase();
        }
    );
}