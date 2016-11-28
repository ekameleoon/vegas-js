"use strict" ;

/**
 * Indicates if the specified character is an <strong>{@link https://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange|ASCII}</strong> character.
 * @param {string} c - The character expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return {boolean} <code>true</code> if the specified character is a <strong>{@link https://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange|ASCII}</strong> character.
 * @memberof core.chars
 * @name isASCII
 * @function
 * @instance
 * @example
 * trace( isASCII( "Z" ) ) ; // true
 * trace( isASCII( "a" ) ) ; // true
 * trace( isASCII( "+" ) ) ; // true
 */
export function isASCII( c , index = 0 )
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return c.charCodeAt( 0 ) <= 255 ;
}
