"use strict" ;

/**
 * Indicates if the specified character is a unicode character (the charcode of the character must be > 255).
 * @name isUnicode
 * @memberof core.chars
 * @function
 * @instance
 * @param {string} c - The expression to evaluate.
 * @param {number} [index=0] - The optional index to evaluate a specific character in the passed-in expression.
 * @return <code>true</code> if the passed-in string value is a unicode character.
 */
export function isUnicode( c  , index /*uint*/ = 0 ) 
{
    if( index > 0 )
    {
        c = c.charAt( index ) ;
    }
    return c.charCodeAt( 0 ) > 255 ;
}
