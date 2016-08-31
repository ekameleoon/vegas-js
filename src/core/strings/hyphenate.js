"use strict" ;

/**
 * Converts a camelcased string to a hyphenated string.
 * @param source The string to transform.
 * @example
 * <code class="prettyprint">
 * trace( hyphenate( "helloWorld" ) ) ; //"hello-world"
 * </code>
 * @return The hyphenated string.
 */
export function hyphenate( source /*String*/ ) /*String*/
{
    return source.replace
    (
        /[A-Z]/g,
        function( match )
        {
            return ('-' + match.charAt(0).toLowerCase());
        }
    );
}